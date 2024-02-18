const User = require("../models/User");
const bcrypt = require("bcryptjs");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../utils/apiErrors");
const Category = require("../models/Caregory");

class UserService {
    async registration(email, password, role, refreshToken) {
        const candidate = await User.findOne({email: email});
        if (candidate)
            return {errorMessage: "This email is already taken. Try another one."};

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = new User({email, password: hashPassword, role: role});
        await user.save();

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        const userData = tokenService.validateRefreshToken(refreshToken);
        const userSave = await User.findOneAndUpdate(
            {_id: userData.id},
            { $inc: { no_of_likes: 1 }, "$push": { "users": userDto.id } },
            {new: true}
        );

        return {...tokens, user: userDto};
    }

    async login(email, password) {
        const candidate = await User.findOne({email: email});
        if (!candidate)
            return {errorMessage: "User email address not found. Try another one."};

        const passwordResult = bcrypt.compareSync(password, candidate.password);
        if (!passwordResult)
            return {errorMessage: "Wrong password. Try another one."};

        const userDto = new UserDto(candidate);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async getUsers(refreshToken){
        const users = [];
        const userData = tokenService.validateRefreshToken(refreshToken);
        const userMain = await User.findById(userData.id);
        for (const userId of userMain.users) {
            const user = await User.findById(userId);
            users.push(user);
        }
        return users;
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken){
        if (!refreshToken)
            return {errorMessage: "Login again"};

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB)
            return {errorMessage: "Login again"};

        const user = await User.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto, role: userDto.role};
    }
}

module.exports = new UserService();
const userService = require("../service/user-service");

module.exports.login = async function (request, response, next) {
    try {
        const {email, password, role} = request.body;
        const userDate = await userService.login(email, password);
        if ("errorMessage" in userDate)
            return response.status(400).json({message: userDate.errorMessage});
        response.cookie("refreshToken", userDate.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        response.status(200).json(userDate);
    } catch (error) {
        next(error);
    }
}

module.exports.register = async function (request, response, next) {
    try {
        const {email, password, role} = request.body;
        const {refreshToken} = request.cookies;
        const userDate = await userService.registration(email, password, role, refreshToken);
        if ("errorMessage" in userDate)
            return response.status(400).json({message: userDate.errorMessage});
        response.status(200).json(userDate);
    } catch (error) {
        next(error);
    }
};

module.exports.getUsers = async function (request, response, next) {
    try {
        const {refreshToken} = request.cookies;
        const userDate = await userService.getUsers(refreshToken);
        response.status(200).json(userDate);
    } catch (error) {
        next(error);
    }
}

module.exports.logout = async function (request, response, next) {
    try {
        const {refreshToken} = request.cookies;
        const token = await userService.logout(refreshToken);
        response.clearCookie("refreshToken");
        response.json(token);
    } catch (error) {
        next(error);
    }
};

module.exports.refresh = async function (request, response, next) {
    try {
        const {refreshToken} = request.cookies;
        const userDate = await userService.refresh(refreshToken);
        if ("errorMessage" in userDate)
            return response.status(400).json({message: userDate.errorMessage});
        response.cookie("refreshToken", userDate.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        response.status(200).json(userDate);
    } catch (error) {
        next(error);
    }
};
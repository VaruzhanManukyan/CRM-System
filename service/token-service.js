const jwt  = require("jsonwebtoken");
const tokenModel = require("../models/Token");
const keys = require("../config/keys");

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload, keys.JWT_KEY_ACCESS, {expiresIn: "15m"});
        const refreshToken = jwt.sign(payload, keys.JWT_KEY_REFRESH, {expiresIn: "15d"})
        return {accessToken, refreshToken};
    }

    validateAccessToken(token) {
        try {
            const userDate = jwt.verify(token, keys.JWT_KEY_ACCESS);
            return userDate;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userDate = jwt.verify(token, keys.JWT_KEY_REFRESH);
            return userDate;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId});

        if (tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenDate = await tokenModel.deleteOne({refreshToken});
        return tokenDate;
    }

    async findToken(refreshToken) {
        const tokenDate = await tokenModel.findOne({refreshToken: refreshToken});
        return tokenDate;
    }
}

module.exports = new TokenService();
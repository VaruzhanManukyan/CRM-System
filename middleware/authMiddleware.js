const ApiError = require("../utils/apiErrors");
const tokenService = require("../service/token-service");

module.exports = function (request, response, next) {
    try {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader)
            return next(ApiError.UnauthorizedError());

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken)
            return next(ApiError.UnauthorizedError());

        const userDate = tokenService.validateAccessToken(accessToken);
        if (!userDate)
            return next(ApiError.UnauthorizedError());

        request.user = userDate;
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}
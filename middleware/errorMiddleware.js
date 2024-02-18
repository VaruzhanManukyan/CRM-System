const ApiError = require("../utils/apiErrors");

module.exports = function (errors, request, response, next) {
    console.log(errors);
    if (errors instanceof ApiError)
        return response.status(errors.status).json({message: errors.message, errors: errors.errors});
    return response.status(500).json({message:"Unexpected error"});
}
module.exports = (response, error) => {
    response.status(500).json({
        success: false,
        message: error.message ? error.message : error
    });
};

module.exports = function unauthorizedError(response, error) {
    response.status(401).json({
        success: false,
        message: error.message ? error.message : error
    });
}
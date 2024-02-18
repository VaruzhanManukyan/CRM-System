const errorHandler = require("../utils/errorHandler");
const Order = require("../models/Order");

module.exports.overview = async function (request, response) {
        response.json({message: "jsdfdsf"})
};

module.exports.analytics = async function (request, response) {
    try {
        const query = {
            user: request.user.id,
        };

        if (request.query.start)
            query.date = {$gte: request.query.start};

        if (request.query.end) {
            if (!query.date)
                query.date = {};
            query.date["$lte"] = request.query.end;
        }

        const orders = await Order.find(query).sort({date: -1});
        response.status(200).json(orders);
    } catch (error) {
        errorHandler(response, error);
    }
};
const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (request, response) {
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

        if (request.query.order)
            query.order = +request.query.order;

        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+request.query.offset)
            .limit(+request.query.limit);

        response.status(200).json(orders);
    } catch (error) {
        errorHandler(response, error);
    }
}
;

module.exports.create = async function (request, response) {
    try {
        const lastOrder = await Order
            .findOne({user: request.user.id})
            .sort({date: -1});

        const maxOrder = lastOrder ? lastOrder.order : 0;
        const order = await new Order({
            list: request.body.list,
            user: request.user.id,
            order: maxOrder + 1,
            date: "2023-05-14T16:51:03.034+00:00",
            totalCost: request.body.params.totalCost,
            totalCostPrice: request.body.params.totalCostPrice
        }).save();


        console.log(order);
        response.status(200).json(order);
    } catch (error) {
        errorHandler(response, error);
    }
};

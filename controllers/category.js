const Category = require("../models/Caregory");
const Position = require("../models/Position")
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (request, response) {

    try {
        const categories = await Category.find({user: request.user.id});
        response.status(200).json(categories);
    } catch (error) {
        errorHandler(response, error);
    }
};

module.exports.getById = async function (request, response) {
    try {
        const category = await Category.findById(request.params.id);
        response.status(200).json(category);
    } catch (error) {
        errorHandler(response, error);
    }
};

module.exports.remove = async function (request, response) {
    try {
        await Category.deleteOne({_id: request.params.id});
        await Position.deleteOne({category: request.params.id});
        response.status(200).json({message: "Category is delete"});
    } catch (error) {
        errorHandler(response, error);
    }
};

module.exports.create = async function (request, response) {
    try {
        const category = new Category({
            name: request.body.name,
            user: request.user.id,
            imageSrc: request.file.path ?? ""
        });
        await category.save();
        response.status(201).json(category);
    } catch (error) {
        errorHandler(response, error);
    }
};

module.exports.update = async function (request, response) {
    try {
        const updated = {name: request.body.name};

        if (request.file.path)
            updated.imageSrc = request.file.path;

        const category = await Category.findOneAndUpdate(
            {_id: request.params.id},
            {$set: updated},
            {new: true}
        );
        response.status(200).json(category);
    } catch (error) {
        errorHandler(response, error);
    }
};
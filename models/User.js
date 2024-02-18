const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    users: []
});

module.exports = mongoose.model("users", userSchema);
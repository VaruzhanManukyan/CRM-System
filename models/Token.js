const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("tokens", TokenSchema);
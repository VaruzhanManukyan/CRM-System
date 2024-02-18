const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser  = require("body-parser");
const cookeParser = require("cookie-parser");
const analyticsRouts = require("./routes/analytics");
const authRouts = require("./routes/auth");
const categoryRouts = require("./routes/category");
const orderRouts = require("./routes/order");
const positionRouts = require("./routes/position");
const errorMiddleware = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const keys = require("./config/keys");
const app = express();

mongoose.connect(keys.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log(error));

app.use(require("morgan")("dev"));
app.use(cookeParser());
app.use(require("cors")());
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/analytics", analyticsRouts);
app.use("/api/auth", authRouts);
app.use("/api/category", categoryRouts);
app.use("/api/order", orderRouts);
app.use("/api/position", positionRouts);

app.use(errorMiddleware);

module.exports = app;
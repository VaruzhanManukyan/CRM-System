const express = require("express");
const controller = require("./../controllers/order");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, controller.getAll);
router.post("/", authMiddleware, controller.create);

module.exports = router;
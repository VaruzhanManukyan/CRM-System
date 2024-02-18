const express = require("express");
const controller = require("./../controllers/analytics");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/overview", authMiddleware, controller.overview);
router.get("/analytics", authMiddleware, controller.analytics);

module.exports = router;
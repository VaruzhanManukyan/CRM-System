const express = require("express");
const controller = require("./../controllers/position");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:categoryId", authMiddleware, controller.getByCategoryId);
router.post("/", authMiddleware, controller.create);
router.patch("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
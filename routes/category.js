const express = require("express");
const upload = require("../middleware/upload");
const controller = require("./../controllers/category");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);
router.delete("/:id", authMiddleware, controller.remove);
router.post("/", authMiddleware, upload.single("image"), controller.create);
router.patch("/:id", authMiddleware, upload.single("image"), controller.update);

module.exports = router;
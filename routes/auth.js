const express = require("express");
const router = express.Router();
const controller = require("./../controllers/auth");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/refresh", controller.refresh);
router.get("/logout", controller.logout);
router.get("/getUsers", controller.getUsers);

module.exports = router;
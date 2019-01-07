const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//body -- email, password
router.post("/login", authController.login);
router.post("/signup", authController.signUp);

module.exports = router;

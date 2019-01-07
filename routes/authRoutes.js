const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//body -- email, password
router.post("/login", authController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

//body -- email, password
router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  authController.me
);

module.exports = router;

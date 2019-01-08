const express = require("express");
const router = express.Router();
const passport = require("passport");
const budgetController = require("../controllers/budgetController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  budgetController.index
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  budgetController.create
);

module.exports = router;

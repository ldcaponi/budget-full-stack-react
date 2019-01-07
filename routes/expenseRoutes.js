const express = require("express");
const router = express.Router();
const passport = require("passport");
const expenseController = require("../controllers/expenseController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  expenseController.index
);

//body -- description, categoryId, name, amount
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  expenseController.create
);

module.exports = router;

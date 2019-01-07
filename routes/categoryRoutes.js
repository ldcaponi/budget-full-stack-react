const express = require("express");
const router = express.Router();
const passport = require("passport");
const categoryController = require("../controllers/categoryController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  categoryController.index
);

//body -- categoryName
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  categoryController.create
);

module.exports = router;

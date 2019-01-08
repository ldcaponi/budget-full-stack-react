const express = require("express");
const router = express.Router();
const passport = require("passport");
const allocationController = require("../controllers/allocationController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  allocationController.index
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  allocationController.create
);

module.exports = router;

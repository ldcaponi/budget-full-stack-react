require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
app.use(passport.initialize());
require("./auth/passport/passport-jwt");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
app.use(passport.initialize());
require("./auth/passport/passport-jwt");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const allocationRouter = require("./routes/allocationRoutes");
const budgetRouter = require("./routes/budgetRoutes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/allocations", allocationRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/users", userRouter);

//set up to serve built clientsde files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.all("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

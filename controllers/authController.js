const pool = require("../db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).send("Error with query");
      }

      //fix this later with bcrypt
      const user = results.rows[0];
      if (user) {
        if (password === user.password) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.APP_SECRET);
          return res.json({ message: "Success!", token });
        } else {
          return res.status(401);
        }
      } else {
        return res.status(500).send("Could not find user");
      }
    }
  );
};

const signUp = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(403).message("Missing information");
  }

  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error with query");
      }

      const newUserId = results.insertId;
      const payload = { id: newUserId };
      const token = jwt.sign(payload, process.env.APP_SECRET);
      return res.json({ message: "Success!", token });
    }
  );
};

module.exports = {
  login,
  signUp
};

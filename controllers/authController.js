const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error with query" });
      }

      const rows = results.rows;
      if (rows && rows.length > 0) {
        const user = rows[0];

        if (user) {
          bcrypt.compare(password, user.password, (err, success) => {
            if (err || !success) {
              return res.status(401).send({ message: "Could not log in" });
            }
            const payload = { id: user.id };
            const token = jwt.sign(payload, process.env.APP_SECRET);
            return res.send({ message: "Success!", token });
          });
        }
      } else {
        return res.status(500).send({ message: "Could not find user" });
      }
    }
  );
};

const signUp = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password) {
    return res.status(403).send({ message: "Missing information" });
  }

  if (password !== confirmPassword) {
    return res.status(401).send({ message: "Passwords must match" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ message: "Issue hashing password" });
    }
    pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hash],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ message: "Error with query" });
        }

        const newUser = results.rows[0];
        const payload = { id: newUser.id };
        const token = jwt.sign(payload, process.env.APP_SECRET);
        return res.json({ message: "Success!", token });
      }
    );
  });
};

const me = (req, res) => {
  res.send(req.user);
};

module.exports = {
  login,
  signUp,
  me
};

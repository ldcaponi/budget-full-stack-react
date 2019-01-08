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

      const rows = results.rows;
      console.log("ROWS", rows);
      if (rows && rows.length > 0) {
        const user = rows[0];
        console.log("USER", user);
        if (user) {
          if (password === user.password) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, process.env.APP_SECRET);
            return res.send({ message: "Success!", token });
          } else {
            return res.status(401).send({ message: "Could not log in" });
          }
        }
      } else {
        return res.status(500).send({ message: "Could not find user" });
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
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error with query");
      }

      const newUser = results.rows[0];
      const payload = { id: newUser.id };
      const token = jwt.sign(payload, process.env.APP_SECRET);
      return res.json({ message: "Success!", token });
    }
  );
};

const me = (req, res) => {
  res.send(req.user);
};

module.exports = {
  login,
  signUp,
  me
};

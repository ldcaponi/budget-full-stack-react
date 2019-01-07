const pool = require("../db");

const index = (req, res) => {
  pool.query(
    "SELECT id, name, email FROM users ORDER BY id ASC",
    (error, results) => {
      if (error) {
        return res.status(500).send("Error with query");
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  index
};

const pool = require("../db");

const index = (req, res) => {
  const id = req.user.id;

  pool.query(
    "SELECT * FROM expenses WHERE owner = $1",
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).send("Error with query");
      }
      res.status(200).json(results.rows);
    }
  );
};

const create = (req, res) => {
  const id = req.user.id;
  const { categoryId, description, name, amount } = req.body;

  pool.query(
    "INSERT INTO expenses (owner, category, description, name, amount) VALUES($1, $2, $3, $4, $5)",
    [id, categoryId, description, name, Number(amount)],
    (error, results) => {
      if (error) {
        return res.status(500).send("Error with query");
      }
      res.status(200).send("Successfully added expense!");
    }
  );
};

module.exports = {
  index,
  create
};

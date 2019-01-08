const pool = require("../db");

const index = (req, res) => {
  const id = req.user.id;

  pool.query(
    "SELECT * FROM allocations WHERE owner_id = $1",
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
  const { categoryId, budgetId, amount } = req.body;

  pool.query(
    "INSERT INTO allocations (owner_id, category_id, budget_id, amount) VALUES ($1, $2, $3, $4)  RETURNING *",
    [id, categoryId, budgetId, Number(amount)],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error with query");
      }
      res.status(200).send({
        message: "Successfully added allocation!",
        data: results.rows[0]
      });
    }
  );
};

module.exports = {
  index,
  create
};

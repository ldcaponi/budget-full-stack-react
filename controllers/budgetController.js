const pool = require("../db");

const index = (req, res) => {
  const id = req.user.id;

  pool.query(
    "SELECT * FROM budget WHERE owner_id = $1",
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
  const { name, amount, startDay } = req.body;

  pool.query(
    "INSERT INTO budget (owner_id, name, amount, start_day) VALUES ($1, $2, $3, $4)  RETURNING *",
    [id, name, Number(amount), Number(startDay)],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error with query");
      }
      res.status(200).send({
        message: "Successfully added budget!",
        data: results.rows[0]
      });
    }
  );
};

const get = (req, res) => {
  const { budgetId } = req.params;
  if (!budgetId) {
    return res.status(403).send({ message: "No budgetId provided" });
  }
  const id = req.user.id;
  pool.query(
    "SELECT * FROM budget WHERE owner_id = $1 AND id = $2",
    [id, budgetId],
    (error, results) => {
      if (error) {
        return res.status(500).send("Error with query");
      }
      console.log(results.rows);
      if (results.rows && results.rows.length) {
        return res.status(200).json(results.rows[0]);
      }
      return res.status(404).send({ message: "Could not find budget" });
    }
  );
};

module.exports = {
  index,
  create,
  get
};

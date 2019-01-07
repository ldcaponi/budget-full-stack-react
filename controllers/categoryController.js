const pool = require("../db");

const index = (req, res) => {
  const id = req.user.id;

  pool.query(
    "SELECT * FROM categories WHERE owner = $1",
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
  const { categoryName } = req.body;
  console.log(id, req.body);

  pool.query(
    "INSERT INTO categories (owner, category_name) VALUES ($1, $2)",
    [id, categoryName],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error with query");
      }
      res.status(200).send("Successfully added category!");
    }
  );
};

module.exports = {
  index,
  create
};

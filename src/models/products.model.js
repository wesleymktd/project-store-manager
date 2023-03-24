const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

const create = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result.insertId;
};

const updateById = async (nameSet, id) =>
  connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
  [nameSet, id],
 );
module.exports = {
  findAll,
  findById,
  create,
  updateById,
};
const connection = require('./connection');

const insertNewSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  ); 

  const promiseRequest = sale.map(({ productId, quantity }) =>
    connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, productId, quantity],
    ));
  
  await Promise.all(promiseRequest);
  
  return {
    id: insertId,
    itemsSold: sale,
  };    
};

module.exports = {
  insertNewSale,
};
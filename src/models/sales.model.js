const connection = require('./connection');

const findSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT 
      s.date,
      prod.product_id AS productId,
      prod.quantity
    FROM StoreManager.sales_products AS prod
    INNER JOIN StoreManager.sales AS s ON prod.sale_id = s.id
    WHERE prod.sale_id = ?`,
    [saleId],
  );
  return result;
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
      prod.sale_id AS saleId,
      s.date,
      prod.product_id AS productId,
      prod.quantity
    FROM StoreManager.sales_products AS prod
    INNER JOIN StoreManager.sales AS s ON prod.sale_id = s.id`,
  );
  return result;
};

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

const findSaleByIdOnly = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );
  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE from sales WHERE id = ?',
    [id],
  );
}; 

module.exports = {
  insertNewSale,
  findAllSales,
  findSaleById,
  deleteSale,
  findSaleByIdOnly,
};
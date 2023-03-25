const { salesModel, productsModel } = require('../models');

const httpGenerator = (status, message) => ({ status, message }); 

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const findSaleById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (sale.length === 0) throw httpGenerator(404, 'Sale not found');
  return sale;
};

const createNewSale = async (sale) => {
  const products = await Promise.all(sale.map(({ productId }) =>
    productsModel.findById(productId)));
  
  if (products.includes(undefined)) {
    throw httpGenerator(404, 'Product not found');
  }

  const registerSale = await salesModel.insertNewSale(sale);
  return registerSale;
};

const deleteSale = async (id) => {
  const sale = await salesModel.findSaleByIdOnly(id);
  if (!sale) throw httpGenerator(404, 'Sale not found');
  await salesModel.deleteSale(id);
};

module.exports = {
  createNewSale,
  findAllSales,
  findSaleById,
  deleteSale,
};
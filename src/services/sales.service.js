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
  console.log(sale);
  if (!sale) throw httpGenerator(404, 'Sale not found');
  await salesModel.deleteSale(id);
};

const updateSale = async (sale, id) => {
  const saleFind = await salesModel.findSaleByIdOnly(id);
  if (!saleFind) throw httpGenerator(404, 'Sale not found');

  const productFind = await Promise.all(sale.map(({ productId }) =>
    productsModel.findById(productId)));
  
  if (productFind.includes(undefined)) {
    throw httpGenerator(404, 'Product not found');
  }

  const returnSale = await salesModel.updateSale(sale, id);
  
  return returnSale;
};

module.exports = {
  createNewSale,
  findAllSales,
  findSaleById,
  deleteSale,
  updateSale,
};
const { salesModel, productsModel } = require('../models');

const httpGenerator = (status, message) => ({ status, message }); 

const createNewSale = async (sale) => {
  const products = await Promise.all(sale.map(({ productId }) =>
    productsModel.findById(productId)));
  
  if (products.includes(undefined)) {
    throw httpGenerator(404, 'Product not found');
  }

  const registerSale = await salesModel.insertNewSale(sale);
  return registerSale;
};

module.exports = {
  createNewSale,
};
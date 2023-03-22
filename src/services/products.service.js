const { productsModel } = require('../models');

const httpGenerator = (status, message) => ({ status, message }); 
const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) throw httpGenerator(404, 'Product not found');
  return product;
};

module.exports = {
  findAll,
  findById,
};
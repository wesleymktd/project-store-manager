const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return  products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) throw { status: 404, message: 'Product not found' }
  return  product;
}

module.exports = {
  findAll,
  findById,
}
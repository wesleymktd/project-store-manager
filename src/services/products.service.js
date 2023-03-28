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

const createProduct = async ({ name }) => {
  const id = await productsModel.create({ name });
  return { id, name };
};

const updateById = async (name, id) => {
  const product = await productsModel.findById(id);
  if (!product) throw httpGenerator(404, 'Product not found');
  await productsModel.updateById(name, id);
  return { name, id };
}; 

const deleteProduct = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) throw httpGenerator(404, 'Product not found');
  await productsModel.deleteProduct(id);
};

const searchProducts = async (search) => {
  const products = await productsModel.searchProducts(search);
  return products;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
  deleteProduct,
  searchProducts,
};
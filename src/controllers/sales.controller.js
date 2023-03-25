const { salesService } = require('../services');

const listAllSales = async (_req, res) => {
  const allSales = await salesService.findAllSales();
  res.status(200).json(allSales);
};

const getSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.findSaleById(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const createNewSale = async (req, res, next) => {
  try {
    const sale = req.body;
    const newSaleRegister = await salesService.createNewSale(sale);
    res.status(201).json(newSaleRegister);
  } catch (error) {
    next(error);
  } 
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewSale,
  listAllSales,
  getSale,
  deleteSale,
};
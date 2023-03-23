const { salesService } = require('../services');

const createNewSale = async (req, res, next) => {
  try {
    const sale = req.body;
    const newSaleRegister = await salesService.createNewSale(sale);
    res.status(201).json(newSaleRegister);
  } catch (error) {
    next(error);
  } 
};

module.exports = {
  createNewSale,
};
const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers'); 
const validateSaleInput = require('../middlewares/validateSaleInputValue');

router.get('/', salesController.listAllSales);

router.get('/:id', salesController.getSale);

router.post('/',
  validateSaleInput,
  salesController.createNewSale);

module.exports = router;
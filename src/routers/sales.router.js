const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers'); 
const validateSaleInput = require('../middlewares/validateSaleInputValue');

// router.get('/', productsController.listProducts);

// router.get('/:id', productsController.getProduct);

router.post('/',
  validateSaleInput,
  salesController.createNewSale);

module.exports = router;
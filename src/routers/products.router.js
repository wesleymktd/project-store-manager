const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers'); 
const validateNameInput = require('../middlewares/validateNameInput');

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.put('/:id',
  validateNameInput,
  productsController.updateProduct);

router.post('/',
  validateNameInput,
  productsController.createProduct);

module.exports = router;
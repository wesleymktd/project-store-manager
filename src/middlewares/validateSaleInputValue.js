const httpGenerator = (status, message) => ({ status, message });

module.exports = (req, _res, next) => {
  const sale = req.body;
  
  sale.forEach(({ productId, quantity }) => {
    if (!productId) {
      throw httpGenerator(400, '"productId" is required');
    }
    if (!quantity && quantity !== 0) {
      throw httpGenerator(400, '"quantity" is required');
    }
    if (quantity <= 0) {
      throw httpGenerator(422, '"quantity" must be greater than or equal to 1');
    }
  });

  next();
};
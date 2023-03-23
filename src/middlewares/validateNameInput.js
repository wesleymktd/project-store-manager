const httpGenerator = (status, message) => ({ status, message });

module.exports = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    throw httpGenerator(400, '"name" is required');
  }
  if (name.length < 5) {
    throw httpGenerator(422, '"name" length must be at least 5 characters long');
  }
  next();
};
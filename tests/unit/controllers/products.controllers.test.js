const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');

const { productsController } = require('../../../src/controllers');
const { allProducts } = require('../models/mocks/products.model.mock');

describe('teste unitário da camada controller products', function () {
  it('Deve retornar o status 200 e a lista', async function () {
    // Arrange
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'findAll').resolves(allProducts);
    // Act
    await productsController.listProducts(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  })  
})
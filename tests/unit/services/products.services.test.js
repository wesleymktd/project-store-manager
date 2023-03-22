const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/products.model.mock');

describe('teste unitário da camada service products', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // Arrange
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    // Act
    const result = await productsService.findAll();
    // Assert
    expect(result).to.be.equal(allProducts);
  })  
})
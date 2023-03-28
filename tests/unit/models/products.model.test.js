const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, productEntry } = require('./mocks/products.model.mock');

describe('teste unitário da camada model products', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.equal(allProducts);
  });
  
  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.equal(allProducts[0]);
  });

  it('Cadastrando novo produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    // Act
    const result = await productsModel.create(productEntry);
    // Assert
    expect(result).to.be.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  })
})
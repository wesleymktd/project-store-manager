const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { saleEntryHappy, returnSaleHappy } = require('../models/mocks/sales.model.mock');

describe('teste unitário da camada service sales', function () {
  it('validando se é possível cadastrar uma venda com sucesso', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(saleEntryHappy);
    sinon.stub(salesModel, 'insertNewSale').resolves(returnSaleHappy);
    // Act
    const result = await salesService.createNewSale(saleEntryHappy);
    // Assert
    expect(result).to.be.deep.equal(returnSaleHappy);
  })  
})
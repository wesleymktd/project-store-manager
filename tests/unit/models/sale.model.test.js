const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const {
  saleEntryHappy,
  returnSaleHappy,
  returnFindOneSale,
  allSales,
  returnSaleByIdOnly,
  returnSaleUpdated,
} = require('./mocks/sales.model.mock');
const insertId = { insertId: 3 }
describe('teste unitário da camada model sales', function () {
  it('validando se é possível cadastrar uma venda com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([insertId])
      .onSecondCall().resolves(saleEntryHappy)
    // Act
    const result = await salesModel.insertNewSale(saleEntryHappy);
    // Assert
    expect(result).to.be.deep.equal(returnSaleHappy);
  });

  it('validando se é possível encontrar uma venda pelo ID', async function () {
    // Arrange
    sinon
      .stub(connection, 'execute').resolves([returnFindOneSale])
    // Act
    const result = await salesModel.findSaleById(3);
    // Assert
    expect(result).to.be.deep.equal(returnFindOneSale);
  });

  it('validando se é possível encontrar todas as vendas', async function () {
    // Arrange
    sinon
      .stub(connection, 'execute').resolves([allSales])
    // Act
    const result = await salesModel.findAllSales();
    // Assert
    expect(result).to.be.deep.equal(allSales);
  });

  it('testando a função findSaleByIdOnly', async function () {
    // Arrange
    sinon
      .stub(connection, 'execute').resolves([[returnSaleByIdOnly]])
    // Act
    const result = await salesModel.findSaleByIdOnly(1);
    // Assert
    expect(result).to.be.deep.equal(returnSaleByIdOnly);
  });

  it('validando se é possível atualizar uma venda com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute')
      .resolves();
    // Act
    const result = await salesModel.updateSale(saleEntryHappy, 1);
    
    // Assert
    expect(result).to.be.deep.equal(returnSaleUpdated);
  });
  
  afterEach(function () {
    sinon.restore();
  })
})
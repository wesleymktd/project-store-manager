const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { saleEntryHappy, returnSaleHappy, returnSaleUpdated } = require('../models/mocks/sales.model.mock');

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
  
  it('validando se é possível atualizar uma venda com sucesso com id válido', async function () {
    // Arrange
    const sale = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];


    sinon.stub(salesModel, 'findSaleByIdOnly').resolves({ "id": 1, "date": "2023-03-28T15:58:09.000Z" });
    sinon.stub(productsModel, 'findById').resolves(
      [
        { "id": 1, "name": "Xablauzão phone 10" },
        { "id": 2, "name": "Traje de encolhimento" }
      ]
    );
    sinon.stub(salesModel, 'updateSale').resolves(returnSaleHappy)
    // Act
    const result = await salesService.updateSale(sale, 1);
    // Assert
    expect(result).to.be.deep.equal(returnSaleHappy);
  }) 

  afterEach(function () {
    sinon.restore();
  })
})
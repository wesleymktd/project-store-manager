const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');

const { salesController } = require('../../../src/controllers');
const { returnSaleHappy } = require('../models/mocks/sales.model.mock');

describe('teste unitário da camada controller sale', function () {
  it('Deve retornar o status 201 e o registro de venda', async function () {
    // Arrange
    const res = {};
    const req = {
      body: returnSaleHappy,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'createNewSale').resolves(returnSaleHappy);
    // Act
    await salesController.createNewSale(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(returnSaleHappy);
  })  
})
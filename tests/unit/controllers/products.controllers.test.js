const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);
chai.use(require('chai-as-promised'));
const { productsService } = require('../../../src/services');

const { productsController } = require('../../../src/controllers');
const { allProducts, returnValidProduct, productEntry, searchProductResult } = require('../models/mocks/products.model.mock');

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
  
  it('testando o retorno ao procurar produto com id válido', async function () {
    // Arrange
    const res = {};
    const req = {
      params:{id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'findById').resolves(returnValidProduct);
    // Act
    await productsController.getProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnValidProduct);
  })
  
  it('testando o retorno ao procurar produto com id inválido', async function () {
    // Arrange
    const err = { status: 404, message: 'Product not found' };
    const res = {};
    const req = {
      params: {id: 50},
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'findById').throws(err);
    // Act

    await expect(productsController.getProduct(req, res)).to.be.rejectedWith(err);
    
  })

  it('Testando cadastro de produto', async function () {
    // Arrange
    const res = {};
    const req = {
      body: productEntry,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'createProduct').resolves(returnValidProduct);
    // Act
    await productsController.createProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(returnValidProduct);
  })

  it('Testando atualizar produto com sucesso com id válido', async function () {
    // Arrange
    const res = {};
    const req = {
      body: productEntry,
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateById').resolves(returnValidProduct);
    // Act
    await productsController.updateProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnValidProduct);
  })

  it('testando o retorno ao atualizar produto com id inválido', async function () {
    // Arrange
    const err = { status: 404, message: 'Product not found' };
    const res = {};
    const req = {
      params: {id: 50},
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateById').throws(err);
    // Act

    await expect(productsController.updateProduct(req, res)).to.be.rejectedWith(err);
    
  })

  it('Testando deletar produto com sucesso com id válido', async function () {
    // Arrange
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'deleteProduct').resolves();
    // Act
    await productsController.deleteProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  })

  it('testando o retorno ao deletar produto com id inválido', async function () {
    // Arrange
    const err = { status: 404, message: 'Product not found' };
    const res = {};
    const req = {
      params: {id: 50},
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'deleteProduct').throws(err);
    // Act

    await expect(productsController.deleteProduct(req, res)).to.be.rejectedWith(err);
    
  })

  it('Testando função getProductSearch', async function () {
    // Arrange
    const res = {};
    const req = {
      query: { q: 'escudo' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'searchProducts').resolves(searchProductResult);
    // Act
    await productsController.getProductSearch(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(searchProductResult);
  })

  afterEach(function () {
    sinon.restore();
  })
})
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);
chai.use(require('chai-as-promised'));

const { productsModel } = require('../../../src/models');


const { productsService } = require('../../../src/services');
const { allProducts, productEntry, returnValidProduct, searchProductResult } = require('../models/mocks/products.model.mock');

describe('teste unitário da camada service products', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // Arrange
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    // Act
    const result = await productsService.findAll();
    // Assert
    expect(result).to.be.equal(allProducts);
  })

  it('Recuperando um produto com id válido', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(returnValidProduct);
    // Act
    const result = await productsService.findById(1);
    // Assert
    expect(result).to.be.equal(returnValidProduct);
  });

  it('Recuperando um produto com id inválido', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // Act
    try {
      await productsService.findById(50);
    } catch (error) {
      expect(error.status).to.be.equal(404)
      expect(error.message).to.be.deep.equal('Product not found')
    }
    
    // Assert
  });

  it('cadastrando um produto com sucesso', async function () {
    // Arrange
    sinon.stub(productsModel, 'create').resolves(1);
    // Act
    const result = await productsService.createProduct(productEntry);
    // Assert
    expect(result).to.be.deep.equal(returnValidProduct);
  })

  it('Atualizando um produto válido com sucesso', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(returnValidProduct);
    // Act
    const result = await productsService.updateById('Xablauzão phone 10', 1);
    
    // Assert
    expect(result).to.be.deep.equal(returnValidProduct);
    // expect(result.name).to.be.deep.equal('Xablauzão phone 10');
  })

  it('teste retorno ao tentar atualizar com id inválido', async function () {
    // Arrange
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // Act
    try {
      await productsService.updateById('Xablauzão phone 10', 50);
      
    } catch (error) {
      expect(error.status).to.be.equal(404);
      expect(error.message).to.be.deep.equal('Product not found')
    }
    // Assert
  })

  it('testando função searchProducts', async function () {
    // Arrange
    sinon.stub(productsModel, 'searchProducts').resolves(searchProductResult);
    // Act
    const result = await productsService.searchProducts('escudo');
    
    // Assert
    expect(result).to.be.deep.equal(searchProductResult);
    // expect(result.name).to.be.deep.equal('Xablauzão phone 10');
  })
  
  afterEach(function () {
    sinon.restore();
  })
})
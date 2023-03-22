const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { productsRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/products', productsRouter)



// não remova esse endpoint, é para o avaliador funcionarr
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
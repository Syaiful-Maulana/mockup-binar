const express = require('express');
const routes = express.Router();
const { add, getAllProduct, getMyProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { login } = require('../middlewares');

routes.post('/products', login, add); // create product
routes.get('/products', login, getAllProduct); // show product
routes.get('/products/:id', login, getDetailProduct); // show product by id
routes.put('/products/:id', login, updateProduct); // update data
routes.delete('/products/:id', login, deleteProduct); // delete data by id

module.exports = routes;

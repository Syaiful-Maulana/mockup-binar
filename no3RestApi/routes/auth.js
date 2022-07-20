const express = require('express');
const routes = express.Router();
const { register, login } = require('../controller/authController');

// welcome
routes.post('/signup', register);
routes.post('/login', login);

module.exports = routes;

const express = require('express');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

module.exports = routes;

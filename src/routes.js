const express = require('express');
const multer = require('multer');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');
const FileController = require('./app/controllers/FileController');

const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.post('/password', ForgotPasswordController.update);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;

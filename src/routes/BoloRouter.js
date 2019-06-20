const express = require('express');
const routes = new express.Router();
const multer = require('multer');

const multerConfig = require('../middlewares/multer');
const BoloController = require('../controllers/BoloController');


routes.post('/cadastro', multer(multerConfig).single('file'), BoloController.cadastro);
routes.get('/',BoloController.getAll);
routes.get('/:id',BoloController.getById);
routes.get('/busca/:tag',BoloController.busca);
routes.delete('/:id', BoloController.delete);
routes.put('/:id', BoloController.alterar);


module.exports = routes;
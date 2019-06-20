const express = require('express');
const routes = new express.Router();
const multer = require('multer');

const multerConfig = require('../middlewares/multer');
const BoloController = require('../controllers/BoloController');
const LikeController = require('../controllers/LikeController');

routes.post('/cadastro', multer(multerConfig).single('file'), BoloController.cadastro);
routes.get('/',BoloController.getAll);
routes.get('/slide',BoloController.getSlidePrincipal);
routes.get('/:id',BoloController.getById);
routes.get('/busca/:tag',BoloController.busca);
routes.delete('/:id', BoloController.delete);
routes.put('/:id', BoloController.alterar);

routes.post('/:id/like', LikeController.likein);

module.exports = routes;
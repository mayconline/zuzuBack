const express = require('express');
const routes = new express.Router();

const {verificarToken, isAdmin} = require('../middlewares/auth');
const DepoController = require('../controllers/DepoController');

routes.post('/criar', verificarToken, DepoController.criar);
routes.put('/alterar/:id',verificarToken,DepoController.alterar);
routes.delete('/:id',verificarToken,DepoController.deletar);
routes.get('/',DepoController.getAll);
module.exports = routes;
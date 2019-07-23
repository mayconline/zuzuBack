const express = require('express');
const routes = new express.Router();

const {verificarToken, isAdmin} = require('../middlewares/auth');
const DepoController = require('../controllers/DepoController');

routes.post('/criar', verificarToken, DepoController.criar);
routes.put('/alterar/:id',verificarToken,DepoController.alterar);
routes.delete('/:id', DepoController.deletar);
routes.get('/', DepoController.getAll);
routes.get('/active', DepoController.getTrue);
routes.put('/:id/active', isAdmin, verificarToken, DepoController.alterarActive);
module.exports = routes;
const express = require('express');
const routes = new express.Router();
const {verificarToken} = require('../middlewares/auth');

const UserControl = require('../controllers/UsuarioController');

routes.get('/', verificarToken, UserControl.getAll);
routes.get('/:id', verificarToken, UserControl.getId);
routes.post('/registro', UserControl.registro);
routes.post('/login', UserControl.login);
routes.put('/:id/alterar', verificarToken, UserControl.alterar);
routes.delete('/:id', verificarToken, UserControl.delete);

module.exports = routes;
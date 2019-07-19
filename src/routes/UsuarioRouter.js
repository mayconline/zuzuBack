const express = require('express');
const routes = new express.Router();
const {verificarToken, isAdmin} = require('../middlewares/auth');

const UserControl = require('../controllers/UsuarioController');
const RecControl = require('../controllers/RecSenhaController');


routes.get('/all', RecControl.getAll);
routes.post('/recsenha', RecControl.recPass);
routes.post('/:idrec/recsenha', RecControl.alterarSenha);

routes.get('/', isAdmin, verificarToken, UserControl.getAll);
routes.get('/:id', verificarToken, UserControl.getId);
routes.post('/registro', UserControl.registro);
routes.post('/login', UserControl.login);
routes.put('/:id/alterar', verificarToken, UserControl.alterar);
routes.post('/:id/altstaff', isAdmin, UserControl.alterarStaff);
routes.delete('/:id', verificarToken, UserControl.delete);






module.exports = routes;
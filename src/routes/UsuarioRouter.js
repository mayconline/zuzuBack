const express = require('express');
const routes = new express.Router();
const { verificarToken, isAdmin } = require('../middlewares/auth');

const UserControl = require('../controllers/UsuarioController');
const RecControl = require('../controllers/RecSenhaController');

routes.get('/all', RecControl.getAll);
routes.post('/recsenha', RecControl.recPass);
routes.post('/:idrec/recsenha', RecControl.alterarSenha);

routes.get('/', isAdmin, verificarToken, UserControl.getAll);
routes.get('/:id', verificarToken, UserControl.getId);
routes.post('/registro', UserControl.registro);
routes.post('/login', UserControl.login);
routes.post('/resend-email', isAdmin, verificarToken, UserControl.resendEmail);
routes.put('/:id/alterar', verificarToken, UserControl.alterar);
routes.put('/:id/altstaff', isAdmin, verificarToken, UserControl.alterarStaff);
routes.delete('/:id', verificarToken, UserControl.delete);

module.exports = routes;

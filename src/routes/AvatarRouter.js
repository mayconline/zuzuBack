const express = require('express');
const routes = new express.Router();
const multer = require('multer');

const { verificarToken, isAdmin } = require('../middlewares/auth');
const multerConfig = require('../middlewares/multer');
const AvatarUser = require('../controllers/AvatarUserController');

routes.post(
  '/:iduser/cadastro',
  verificarToken,
  multer(multerConfig).single('file'),
  AvatarUser.cadastro,
);
routes.put(
  '/:iduser/alterar',
  verificarToken,
  multer(multerConfig).single('file'),
  AvatarUser.alterar,
);
routes.get('/', isAdmin, AvatarUser.getall);
routes.delete('/:iduser/delete', verificarToken, AvatarUser.remove);

module.exports = routes;

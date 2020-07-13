const Usuario = require('../models/Usuario');
const AvatarUser = require('../models/AvatarUser');
const cloudinary = require('cloudinary');
const { TYPE_STORAGE } = process.env;

module.exports = {
  async cadastro(req, res) {
    const { iduser } = req.params;
    const {
      originalname,
      bytes: size,
      key,
      secure_url: url = '',
      public_id,
    } = req.file;

    try {
      let usuario = await Usuario.findById(iduser);
      if (!usuario) return res.status(401).send('usuario nao registrado');

      //verifica se é admin, pode ver tudo,//
      //se for usuario, precisa ser o proprio id//

      if (req.userId != usuario._id && req.staff != 'admin') {
        return res.status(401).send({ error: 'token nao pertence ao usuario' });
      }

      const cadastro = await AvatarUser.create({
        url,
        name: originalname,
        size,
        key,
        public_id,
      });

      await usuario.updateOne({
        avatar: cadastro._id,
      });

      return res.json(cadastro);
    } catch (e) {
      return res.status(400).send(`${e} Favor verifique os dados digitados`);
    }
  },

  async alterar(req, res) {
    const { iduser } = req.params;
    const {
      originalname,
      bytes: size,
      key,
      secure_url: url = '',
      public_id,
    } = req.file;

    try {
      //procura o usuario//
      let usuario = await Usuario.findById(iduser).populate(
        'avatar',
        'url public_id',
      );
      if (!usuario) return res.status(401).send('usuario nao registrado');

      //verifica se é admin, pode ver tudo,//
      //se for usuario, precisa ser o proprio id//

      if (req.userId != usuario._id && req.staff != 'admin') {
        return res.status(401).send({ error: 'token nao pertence ao usuario' });
      }

      //apaga a foto do storage//
      if (TYPE_STORAGE == 'online') {
        await cloudinary.v2.uploader.destroy(usuario.avatar.public_id);
      }

      //apaga a foto do banco de dados//
      let foto = await AvatarUser.findById(usuario.avatar._id);
      await foto.remove();

      //cadastro a nova foto
      const cadastro = await AvatarUser.create({
        url,
        name: originalname,
        size,
        key,
        public_id,
      });

      await usuario.updateOne({
        avatar: cadastro._id,
      });

      return res.json(cadastro);
    } catch (e) {
      return res.status(400).send(`${e} Favor verifique os dados digitados`);
    }
  },

  async getall(req, res) {
    let avatar = await AvatarUser.find().sort('-createdAt');
    return res.json(avatar);
  },

  async remove(req, res) {
    const { iduser } = req.params;

    try {
      //procura o usuario//
      let usuario = await Usuario.findById(iduser).populate(
        'avatar',
        'url public_id',
      );
      if (!usuario) return res.status(401).send('usuario nao registrado');

      //verifica se é admin, pode ver tudo,//
      //se for usuario, precisa ser o proprio id//

      if (req.userId != usuario._id && req.staff != 'admin') {
        return res.status(401).send({ error: 'token nao pertence ao usuario' });
      }

      //apaga a foto do storage//
      if (TYPE_STORAGE == 'online') {
        await cloudinary.v2.uploader.destroy(usuario.avatar.public_id);
      }

      //apaga a foto do banco de dados//
      let foto = await AvatarUser.findById(usuario.avatar._id);
      await foto.remove();

      //atualiza a url pra null//
      await usuario.updateOne({
        avatar: null,
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.status(400).send(`${e} Favor verifique os dados digitados`);
    }
  },
};

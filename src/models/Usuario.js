const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchemma = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },
    staff: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AvatarUser',
      default: null,
    },
  },
  { timestamps: true },
);

UsuarioSchemma.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('senha')) return next();

  user.senha = await bcrypt.hash(user.senha, 10);
  return next();
});

module.exports = mongoose.model('Usuario', UsuarioSchemma);

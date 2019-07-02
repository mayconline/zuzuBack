const mongoose = require('mongoose');

const RecSenha = new mongoose.Schema({
    idusuario:{
        type:String,
        required:true
    },
    tokenExpire:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('RecSenha',RecSenha)
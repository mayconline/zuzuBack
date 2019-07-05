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
   
},{timestamps: true}

)
//deleta o documento apos o tempo definido em expire //
RecSenha.index({'createdAt':1},{expireAfterSeconds:180})

module.exports = mongoose.model('RecSenha',RecSenha)
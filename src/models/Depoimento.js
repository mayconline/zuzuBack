const mongoose = require('mongoose');

const Depoimento = new mongoose.Schema({
    idusuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
   descricao:{
       type:String,
       required:true,
       default:'Deixe seu Comentário, é muito importante para nós'
   },
   nota:{
       type:Number,
       default:0,
       required:true
   }
},{timestamps:true})

module.exports = mongoose.model('Depoimento',Depoimento)
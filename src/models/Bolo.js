const mongoose = require('mongoose');


const BoloSchema = new mongoose.Schema({
    descricao:{ 
        type:String,
        required:true
    },
    tags:[{
        type:String,
        required:true,
        text:true
    }],
    likes:{
        type:Number,
        default:0
    },
    url:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    size:{
        type:Number
    },
    key:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    }
},
    {timestamps:true}

);

module.exports = mongoose.model('Bolo', BoloSchema);
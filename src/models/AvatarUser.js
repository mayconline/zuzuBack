const mongoose = require('mongoose');

const AvatarUserSchema = new mongoose.Schema({
    name:String,
    size:Number,
    key:String,
    url:String,
    public_id:String
},
{timestamps:true}
);

module.exports = mongoose.model('AvatarUser', AvatarUserSchema)
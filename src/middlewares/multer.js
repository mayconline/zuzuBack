const crypto = require('crypto');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const {TYPE_STORAGE} = process.env;



//objeto com os tipos de storages//
const TypeStorage = {
   
    //storage Online //
    online: cloudinaryStorage({
        cloudinary:cloudinary,
        folder:'fotos',
        filename:(req, file, cb)=>{
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

                //splitando pra pegar somente o nome sem a extesao jpg//
                let originalnome = file.originalname;
                let nome = originalnome.split('.');
               

              file.key = `${hash.toString('hex')}-${nome[0]}`;
            
                cb(null,file.key);
            })
        },
       transformation:{
           quality: "auto:eco",
           width: 768,    
           height:1024,  
           crop:'limit', 
           fetch_format:'auto',
           dpr:'auto'
            }
    })
}

module.exports ={
       
    storage: TypeStorage[TYPE_STORAGE],
    limits:{
        fileSize:10*1024*1024
    },
    fileFilter:(req, file,cb)=>{
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
            if(allowedMimes.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb(new Error('Formato de arquivo invalido'))
            }
    }    

    
};
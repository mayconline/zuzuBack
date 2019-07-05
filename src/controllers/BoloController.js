const Bolo = require('../models/Bolo');
const {TYPE_STORAGE} = process.env;
const cloudinary = require('cloudinary');

module.exports ={

    async getAll(req,res){
        try{
            const bolos = await Bolo.find().sort('-createdAt')

            return res.json(bolos);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        }
    },

    async getSlidePrincipal(req,res){
        try{
            const bolos = await Bolo.find({}, '_id url descricao').sort('-likes')

            return res.json(bolos);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        }
    },

    async cadastro(req,res){
        try{
            console.log(req.file)

            const {originalname, bytes:size, key, secure_url:url='', public_id} = req.file;
            const {descricao, tags} = req.body;

            const cadastro = await Bolo.create({

                descricao,
	            tags,
	            url,	
 	            name: originalname,
                size,
                key,
                public_id
            });

            return res.json(cadastro);
        }
        catch(e){
            return res.status(400).send({error:`${e} Verifique os dados digitados`});
        }
    },

    async delete(req,res){

        try{
            
            let bolo = await Bolo.findById(req.params.id);

             if(TYPE_STORAGE == 'online') {
                await cloudinary.v2.uploader.destroy(bolo.public_id);
             }

             await bolo.remove();

             return(res.send('deletado com sucesso'))
        }
        catch(e){
            return res.status(400).send(`${e} Não foi encontrado`);

        }


    },

    async getById(req,res){
        try{
            let bolo = await Bolo.findById(req.params.id);
                
           return res.json(bolo);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        };
        
    },
    async alterar(req,res){
        try{
            let bolo = await Bolo.findByIdAndUpdate(req.params.id ,req.body, {new:true});
            return res.json(bolo);
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },
    async busca(req,res){
        
        const {tag} = req.params;
        //verifica se veio parametro
        if(!tag){
            return res.status(401).send({error: "pesquisa vazia"});
        }

        try{
            //transforma em LowerCase
          const tags =  await tag.toLowerCase();
                //consulta no banco na coluna index definina no model 'tags'//
           const busca = await Bolo.find({$text:{ $search:tags}})

                             return res.json(busca);
 
        }
        catch(e){
         return res.status(400).send(`${e} Houve um erro de Processamento`);
        };
          
     }
}
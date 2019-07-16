const Depoimento = require('../models/Depoimento');
const AvatarUser = require('../models/AvatarUser');
const Usuario = require('../models/Usuario');

module.exports={

    async criar(req, res){

        if(!req.userId) {return res.status(401).send({error: "faltando token"});} 

        const {descricao, nota} = req.body
        try{
            const criar = await Depoimento.create({
                idusuario:req.userId,
                descricao,
                nota
            })

            return res.json(criar)
        }
        catch(e){
            return res.status(400).send({error:`${e} Verifique os dados digitados`});
        }
    },
    
    async alterar(req, res){

        if(!req.userId) {return res.status(401).send({error: "faltando token"});}     
        
        try{
            let alterar = await Depoimento.findByIdAndUpdate(req.params.id ,req.body, {new:true});
            return res.json(alterar);
        }
        catch(e){
            return res.status(400).send({error:`${e} Verifique os dados digitados`});
        }
    },

    async deletar(req,res){
        try{
            await Depoimento.findByIdAndRemove(req.params.id)
                return(res.json({deletado:true}))
        }
        catch(e){
            return res.status(400).send({error:`${e} Ocorreu um erro ao tentar excluir`});
        }
    },

    async getAll(req, res){
        try{
            const depoimentos = await Depoimento.find().sort('-createdAt')
            .populate({
                path:'idusuario',
                select:'nome avatar',
                    populate:{
                        path:'avatar',
                        select:'url'
                    }
            })
                      
            res.json(depoimentos)
                    
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        }
    }


}
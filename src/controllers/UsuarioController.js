const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {gerarToken}= require('../middlewares/auth');


module.exports ={

    async getAll(req,res){
        const user = await Usuario.find().sort('-createdAt');
            return res.json(user);

            //exemplo pegando o userId pelo token
     // const user = await User.find({_id:req.userId})
      //  return res.send({userId:req.userId, user})
    },
    
    async getId(req,res){
        const user = await Usuario.findById(req.params.id).select('+senha');

        return res.json(user);
    },

    async registro (req, res){

        const {usuario} = req.body;
            

        try {
            const user = await Usuario.findOne({usuario});
                if(user) return res.send('usuario ja cadastrado');

            const registro = await Usuario.create(req.body);

            const jwtToken = await gerarToken(registro._id);
             
            return res.send({registro, jwtToken})
        }

        catch(e) {
            return res.send(`Faltam Dados para Registro ${e}`)
        }        
        
    },

    async login(req, res) {
        const {usuario, senha} = req.body;

        if(!usuario || !senha) return res.status(400).send("Favor insira os dados de login");

        try {

            const user = await Usuario.findOne({usuario}).select('+senha');
                 if(!user) return res.status(401).send('usuario nao registrado');

            const logado = await bcrypt.compare(senha, user.senha);
                if(!logado) return res.status(401).send('Senha Invalida');

             user.senha = undefined;

            const jwtToken = await gerarToken(user._id);
            
                return res.send({user, jwtToken, status:`${user.nome} está online`});
              

        }

        catch(e) {
            return res.status(400).send(`Erro ao buscar o usuario ${e}`);
        }
    },

    async alterar(req,res){
        try{
            let usuario = await Usuario.findById(req.params.id);
             if(!usuario) return res.status(401).send('usuario nao registrado');

           
              const senhaCrypt =  await bcrypt.hash(req.body.senha, 10);
                
                await usuario.updateOne({
                            nome:req.body.nome,
                            usuario:req.body.usuario,
                            senha:senhaCrypt
                });
            
                const alterado = await Usuario.findById(req.params.id);
            return res.json({alterado})
           
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },

    async delete(req,res){

        try{
            
            let usuario = await Usuario.findById(req.params.id);

            
             await usuario.remove();

             return(res.json({deletado:true}))
        }
        catch(e){
            return res.status(400).send(`${e} Não foi encontrado`);

        }


    },
};

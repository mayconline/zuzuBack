const Usuario = require('../models/Usuario');
const AvatarUser = require('../models/AvatarUser');
const Depoimento = require('../models/Depoimento');
const bcrypt = require('bcrypt');
const {gerarToken}= require('../middlewares/auth');
const sendgrid = require('../middlewares/sendgrid');

const cloudinary = require('cloudinary');
const {TYPE_STORAGE} = process.env;


module.exports ={

    async getAll(req,res){
        const user = await Usuario.find().sort('-createdAt')
        .populate('avatar','url public_id');
            return res.json(user);

            //exemplo pegando o userId pelo token
     // const user = await User.find({_id:req.userId})
      //  return res.send({userId:req.userId, user})
    },
    
    async getId(req,res){

        const usuario = await Usuario.findById(req.params.id).select('+senha')
.populate('avatar','url public_id')

        //verifica se é admin, pode ver tudo,//
        //se for usuario, precisa ser o proprio id//
        
        if(req.userId!=usuario._id && req.staff!='admin') {           
            return res.status(401).send({error: "token nao pertence ao usuario"});
           }

        return res.json(usuario);
    },

    async registro (req, res){

        const {usuario} = req.body;
            

        try {
            const user = await Usuario.findOne({usuario});
                if(user) return res.send('usuario ja cadastrado');

            const registro = await Usuario.create(req.body);

           await sendgrid.send(req.body.usuario, 'Bem vindo a Zuzu Cakes', 
             `<p>Seja Bem vindo ${req.body.nome}, Visite nosso site e se delicie com nossos bolos deliciosos
              feitos especialmente para você, não esqueça de nos avaliar, 
              sua opnião é muito importante para nós</p>
              <p>Desejamos que tenha um Excelente dia</p>
              <Strong>Equipe Zuzu Cakes</Strong>  
              `)

            const jwtToken = await gerarToken(registro._id, registro.staff);
             
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

                    const jwtToken = await gerarToken(user._id, user.staff);

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
              
            //verifica no token se é admin, pode ver tudo,//
        //se for usuario, precisa ser o proprio id//
        
        if(req.userId!=usuario._id && req.staff!='admin') {           
            return res.status(401).send({error: "token nao pertence ao usuario"});
           }
           
              const senhaCrypt =  await bcrypt.hash(req.body.senha, 10);
                
                await usuario.updateOne({
                            nome:req.body.nome,
                            usuario:req.body.usuario,
                            senha:senhaCrypt
                });

               
            
                const alterado = await Usuario.findById(req.params.id);

                const jwtToken = await gerarToken(alterado._id, alterado.staff);

            return res.json({alterado, jwtToken})
           
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },
    async alterarStaff(req,res){
        try{
            let usuario = await Usuario.findById(req.params.id);
             if(!usuario) return res.status(401).send('usuario nao registrado');

                if(usuario.staff=='user'){
                    await usuario.updateOne({staff:'admin' });
                        return res.json({ok:true})
                         }
                else
                    await usuario.updateOne({staff:'user' });
                         return res.json({ok:true})                    
               
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },

    async delete(req,res){

        try{
             //procura o usuario//
            let usuario = await Usuario.findById(req.params.id)
            .populate('avatar','url public_id');
            if(!usuario) return res.status(401).send('usuario nao registrado');


            //verifica se é admin, pode ver tudo,//
        //se for usuario, precisa ser o proprio id//       
        if(req.userId!=usuario._id && req.staff!='admin') {           
            return res.status(401).send({error: "token nao pertence ao usuario"});
           }

          

            //apaga a foto do storage//
            if(TYPE_STORAGE == 'online' && usuario.avatar!=null) {
                await cloudinary.v2.uploader.destroy(usuario.avatar.public_id);
            }

             //apaga a foto do banco de dados//
            if(usuario.avatar!=null){
                let foto = await AvatarUser.findById(usuario.avatar._id);
                await foto.remove();
            }
            

             //procura depoimento do usuario pra apagar
             let depoimento = Depoimento.findOne({
                 idusuario:usuario._id
             })
             await depoimento.remove();
            

                //deleta usuario
                await usuario.remove();

                    return(res.json({deletado:true}))
       
            
        }
        catch(e){
            return res.status(400).send(`${e} Não foi encontrado`);

        }


    },

    

};

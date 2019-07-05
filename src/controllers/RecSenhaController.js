const RecSenha = require('../models/RecSenha');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const sendgrid = require('../middlewares/sendgrid');
const {gerarToken}= require('../middlewares/auth');

module.exports={

    
    async recPass(req, res){

        const {usuario} = req.body;
            if(!usuario) return res.status(400).send("Favor insira os dados de login");

        try{

            await usuario.toLowerCase();
            
            const user = await Usuario.findOne({usuario})
                 if(!user) return res.status(401).send('usuario nao registrado');

                 const jwtToken = await gerarToken(user._id, user.staff);

                 const registro = await RecSenha.create({
                    idusuario:user._id,
                    tokenExpire:jwtToken
                 });



                 await sendgrid.send(user.usuario, 'Redefinição de Senha', 
                 `<p>Olá ${user.nome}, Você solicitou uma troca de senha</p>
                  <p>Clique no link abaixo para alterar a senha</p>

                  <p>
                  <a href='http://localhost:3000/usuarios/${registro._id}/resetar-senha' rel='noopener noreferrer' target='_blank'>
                        http://localhost:3000/usuarios/${registro._id}/resetar-senha
                  </a>
                 </p>
                 <p> Este link expira em 24 horas, Caso não tenha sido você, favor desconsiderar</p>
                 
                  <Strong>Equipe Zuzu Cakes</Strong>  
                  `)

                  return res.json({ok:true});
        }
        catch(e){
            return e;
        }
    },

    async alterarSenha(req,res){

        const registro = await RecSenha.findById(req.params.idrec);
         if(!registro) return res.status(401).send("link invalido");
          
          try{
               //verifica se o token é valido //
             //   await verificaTokenEmail(registro.tokenExpire);
            
           let usuario = await Usuario.findById(registro.idusuario);
             if(!usuario) return res.status(401).send('usuario nao registrado');
           
            const {senha} = req.body;
                if(!senha) return res.status(400).send("Favor insira os dados para alterar");
            
             const senhaCrypt =  await bcrypt.hash(senha, 10);
           
             await usuario.updateOne({
                        senha:senhaCrypt
                     });


            await registro.remove();

                return res.json({ok:true})


            }
            catch(e){
                return e;
            }
    },

   async getAll(req, res){
        const registro = await RecSenha.find().sort('-createdAt');
            return res.json(registro);
    },


}
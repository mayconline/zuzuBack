const jwt = require('jsonwebtoken');
const {JWTTOKEN} = process.env;

module.exports = {

    async gerarToken(userId, staff){
        return await jwt.sign({userId, staff}, JWTTOKEN, {expiresIn:86400});
   },

    verificarToken(req, res, next){

        const authHeader = req.headers.authorization;
            if(!authHeader) return res.status(401).send({error: "Faltando Token"});
    
        jwt.verify(authHeader, JWTTOKEN,(err, decoded)=>{
            if(err) return res.status(401).send({error:"Token Invalido"})
    
          
            //pega o id do usuario pelo token decode
            req.userId = decoded.userId;
            req.staff = decoded.staff;
            
                return next();
        })
    
    },

   isAdmin(req, res, next){
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({error: "Faltando Token"});
            else {
             jwt.verify(authHeader, JWTTOKEN,(err, decoded)=>{
                    if(err) return res.status(401).json({error:"Token Invalido"})
            
                   
                        else {
                         
                            if( decoded.staff && decoded.staff.includes('admin')){
                                return next();
                            } else {
                                res.status(401).json({
                                    error:'você nao tem permissao para acessar essa área'
                                })
                            }

                        }
                    
                       
                })
            }
       

    },



    

}

const jwt = require('jsonwebtoken');
const {JWTTOKEN} = process.env;

module.exports = {

    async gerarToken(userId){
        return await jwt.sign({userId}, JWTTOKEN, {expiresIn:86400});
   },

    verificarToken(req, res, next){

        const authHeader = req.headers.authorization;
            if(!authHeader) return res.status(401).send({error: "Faltando Token"});
    
        jwt.verify(authHeader, JWTTOKEN,(err, decoded)=>{
            if(err) return res.status(401).send({error:"Token Invalido"})
    
            //pega o id do usuario pelo token decode
            req.userId = decoded.userId;
            
                return next();
        })
    
    }

    

}

const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config()

const SECRET = process.env.SECRET

const tokenAuthentication = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        res.status(401).json({"Message":"No autorizado"})
    }

    jwt.verify(token,SECRET,(error, usuario)=>{
        if(error){
            res.status(403).json({"Error":"Token invalido no autorizado"})
        }
        req.user = usuario;
        next();
    })
}

module.exports = tokenAuthentication
const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
dotenv.config();

const SECRET = process.env.SECRET;

router.post('/login', async (req, res)=>{
    try{
        const {username, password} = req.body;
        const usuario = await Usuario.findOne({
            where: {username}
        })
        if(!usuario){
            res.status(404).json("Usuario no encontrado")
        }

        const passValid = await bcrypt.compare(password, usuario.password)
        if(!passValid){
            res.status(401).json("Credenciales incorrectas")
        }

        const token = jwt.sign({id:usuario.id, username:usuario.username}, SECRET, {
            expiresIn:'5min'
        })

        res.json({token})

    }catch (error){
        console.log(error)
    }
})


router.post('/register', async (req, res)=>{
    try {
        const {username, password} =  req.body
        const usuario = await Usuario.findOne({
            where: {username}
        })
        if(usuario){
             res.status(400).json("Ya existe ese nombre de usuario en nuestra BDD")
        }

        const newUsuario = await Usuario.create({
            username: username,
            password: password,
        })

        res.status(201).json({'message':'Usuario creado exitosamente', 'result':newUsuario.username})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
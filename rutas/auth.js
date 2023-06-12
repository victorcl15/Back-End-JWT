const { Router } = require('express')
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs")
const Usuario = require('../models/Usuario');
const {generarjwt} = require("../helpers/jwt")

 const router = Router()
router.post("/", [
    check("email", "invalid.email").isEmail(),
    
    check("password", "invalid.password").not().isEmpty()
], async function(req, res){

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const usuario = await Usuario.findOne({email: req.body.email})
        if(!usuario){
            return res.status(400).send({mensaje: "User not found"});
        }

        const esIgual = bcrypt.compareSync(req.body.password, usuario.password)

        if(!esIgual){
            return res.status(400).send({mensaje: "User not found"});
        }

        //generar token
        const token = generarjwt(usuario);

        res.json({_id: usuario._id, name: usuario.name, rol: usuario.rol, email: usuario.email, access_token: token})

    }catch (error){
        res.status(500).json({mensaje: "Internal server error"})
    }
}
)


module.exports = router;
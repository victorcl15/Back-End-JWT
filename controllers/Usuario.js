const Usuario = require('../models/Usuario')
const {request, response} = require('express')
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs")


/**
 * Creación
 */
const createUsuario = (req = request,
    res = response) => {
    
        const newUsuario = new Usuario ({
    
             name: req.body.name,
             email: req.body.email,
             estado: req.body.estado || true,
             date: new Date(),
             dateUp: new Date()
         })
         
         newUsuario.save().then(savedUsuario => {
             res.send(savedUsuario)
         })
         


}

//creacion con JWT

const createUsuarioJWT = async(req = request,
    res = response) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeUsuario = await Usuario.findOne({email: req.body.email})
        if(existeUsuario){
            return res.status(400).send("Email ya existe");
        }

        let usuario = new Usuario();

        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const salt = bcrypt.genSaltSync()

        const password = bcrypt.hashSync( req.body.password, salt);
        usuario.password = password;
        usuario.estado = req.body.estado || true;
        usuario.date = new Date();
        usuario.dateUp = new Date();

        usuario = await usuario.save();

        res.send(usuario);


    }catch(error){
        console.log(error);
        res.status(500).json({mensaje: "Internal server error"});
    }
}


/**
 * Edición
 */

const editarUsuario = (req = request,
    res = response, next) => {
    
        const {id} = req.params

        const usuario = req.body
        const newUsuarioInfo = {
            name: usuario.name,
            email: usuario.email,
            rol: usuario.rol,
            password: usuario.password,
            estado: usuario.estado || true,
        }
        Usuario.findByIdAndUpdate(id, newUsuarioInfo, { new: true})
        .then(result => {
            res.json(result)
        })
}


/**
 * Listar todos
 */
const getUsuario = (req = request,
    res = response) => {
    
        Usuario.find({}).then(equipos => {
            res.json(equipos)
        })
}

const getUsuarioJWT = async (req= request, res = response) => {
   

        try{
    
            const usuarios = await Usuario.find({})
            res.json(usuarios);
    
        }catch(error){
            res.status(500).send("Ocurrio un error")
        }
    }


const getUsuarioId = (req = request,
    res = response, next) => {
    
        const {id} = req.params
        //const student = students.find( c => c.id === parseInt(req.params.id))
        Usuario.findById(id).then(equipo => {
            if (equipo){ return res.json(equipo) 
            } else { res.status(404).send("Equipo no encontrado");
        
        }}).catch(error => {
            next(error)
        })
    }

    /**
 * Eliminar
 */
    const deleteUsuario = (req = request,
        res = response, next) => {
        
            const {id} = req.params
    
    Usuario.findByIdAndDelete(id).then(resultado => {
        res.status(204).end()
    }).catch(error => next(error))
    }
    

module.exports = {createUsuario, createUsuarioJWT, getUsuario, getUsuarioJWT,
     getUsuarioId, editarUsuario, deleteUsuario}
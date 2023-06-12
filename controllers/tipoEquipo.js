const Equipo = require('../models/Equipo')
const {request, response} = require('express')
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs")


/**
 * Creación
 */
const createTipoEquipo = async (req = request,
    res = response) => {
    

        const name = req.body.name
        const newEquipo = new Equipo ({
    
             name: req.body.name,
             estado: req.body.estado || true,
             date: new Date(),
             dateUp: new Date()
    
         } )
         

         const validarEquipo = await Equipo.findOne({name})

         if (validarEquipo){
            return res.status(400).json({msg: "Ya existe"})
         }

         newEquipo.save().then(savedEquipo => {
             res.send(savedEquipo)
         })
         


}

//creacion con JWT

const createTipoEquipoJWT = async(req = request,
    res = response) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeTipoEquipo = await Equipo.findOne({name: req.body.name})
        if(existeTipoEquipo){
            return res.status(400).send("Nombre ya existe");
        }

        let tipoEquipo = new Equipo();

        tipoEquipo.name = req.body.name;
        tipoEquipo.estado = req.body.estado || true;

        tipoEquipo.date = new Date();
        tipoEquipo.dateUp = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);


    }catch(error){
        console.log(error);
        res.status(500).json({mensaje: "Internal server error"});
    }
}


/**
 * Edición
 */

const EditarTipodeEquipo = (req = request,
    res = response) => {
    
        const {id} = req.params

        const equipo = req.body
        const newEquipoInfo = {
            name: equipo.name,
            estado: equipo.estado || false,
        }
        Equipo.findByIdAndUpdate(id, newEquipoInfo, { new: true})
        .then(result => {
            res.json(result)
        })
}


/**
 * Listar todos
 */
const getTipoEquipos =  (req = request,
    res = response) => {
    
        Equipo.find({}).then(equipos => {
            res.json(equipos)
        })
}

const getTipoEquipoJWT = async (req= request, res = response) => {
   

    try{

        const tipoequipos = await Equipo.find({})
        res.json(tipoequipos);

    }catch(error){
        res.status(500).send("Ocurrio un error")
    }
}

const getTipodeEquiposId = (req = request,
    res = response, next) => {
    
        const {id} = req.params
        //const student = students.find( c => c.id === parseInt(req.params.id))
        Equipo.findById(id).then(equipo => {
            if (equipo){ return res.json(equipo) 
            } else { res.status(404).send("Equipo no encontrado");
        
        }}).catch(error => {
            next(error)
        })
    }

    /**
 * Eliminar
 */
    const deleteTipoEquipos = (req = request,
        res = response, next) => {
        
            const {id} = req.params
    
    Equipo.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    }).catch(error => next(error))
    }
    

module.exports = {createTipoEquipo, createTipoEquipoJWT, getTipoEquipos, getTipoEquipoJWT, getTipodeEquiposId, EditarTipodeEquipo, deleteTipoEquipos}
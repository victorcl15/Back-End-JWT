const estadoEquipo = require('../models/estadoEquipo')
//const estadoEquipo = require('../models/estadoEquipo')
const {request, response} = require('express')
const { validationResult, check } = require("express-validator");


/**
 * Creación
 */
const createEstadoEquipos = (req = request,
    res = response) => {
    
        const newEstadoEquipo = new estadoEquipo ({
    
             name: req.body.name,
             estado: req.body.estado || false,
             date: new Date(),
             dateUp: new Date()
         })
         
         newEstadoEquipo.save().then(savedEquipo => {
             res.send(savedEquipo)
         })
         


}

//creacion con JWT

const createEstadoEquipoJWT = async(req = request,
    res = response) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeEstadoEquipo = await estadoEquipo.findOne({name: req.body.name})
        if(existeEstadoEquipo){
            return res.status(400).send("Estado del equipo ya existe");
        }

        let estadoequipo = new estadoEquipo();

        estadoequipo.name = req.body.name;
        estadoequipo.estado = req.body.estado || true;
        estadoequipo.date = new Date();
        estadoequipo.dateUp = new Date();



        estadoequipo = await estadoequipo.save();

        res.send(estadoequipo);


    }catch(error){
        console.log(error);
        res.status(500).json({mensaje: "Internal server error"});
    }
}

/**
 * Edición
 */

const EditarEstadoEquipos = (req = request,
    res = response, next) => {
    
        const {id} = req.params

        const equipo = req.body
        const newEstadoEquipoInfo = {
            name: equipo.name,
            estado: equipo.estado || false,
        }
        estadoEquipo.findByIdAndUpdate(id, newEstadoEquipoInfo, { new: true})
        .then(result => {
            res.json(result)
        })
}

const getEstadoEquipoJWT = async (req= request, res = response) => {
   

    try{

        const estadoequipo = await estadoEquipo.find({})
        res.json(estadoequipo);

    }catch(error){
        res.status(500).send("Ocurrio un error")
    }
}

/**
 * Listar todos
 */
const getEstadoEquipos = (req = request,
    res = response) => {
    
        estadoEquipo.find({}).then(equipos => {
            res.json(equipos)
        })
}

const getEstadoEquiposId = (req = request,
    res = response, next) => {
    
        const {id} = req.params
        //const student = students.find( c => c.id === parseInt(req.params.id))
        estadoEquipo.findById(id).then(equipo => {
            if (equipo){ return res.json(equipo) 
            } else { res.status(404).send("Equipo no encontrado");
        
        }}).catch(error => {
            next(error)
        })
    }

    /**
 * Eliminar
 */
    const deleteEstadoEquipos = (req = request,
        res = response, next) => {
        
            const {id} = req.params
    
    estadoEquipo.findByIdAndDelete(id).then(resultado => {
        res.status(204).end()
    }).catch(error => next(error))
    }
    

module.exports = {createEstadoEquipos, createEstadoEquipoJWT, getEstadoEquipos, getEstadoEquipoJWT, getEstadoEquiposId, EditarEstadoEquipos,
     deleteEstadoEquipos}
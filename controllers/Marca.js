const Marca = require('../models/Marca')
const {request, response} = require('express')
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs")



/**
 * Creación
 */
const createMarca = (req = request,
    res = response) => {
    
        const newMarca = new Marca ({
    
             name: req.body.name,
             estado: req.body.estado || false,
             date: new Date(),
             dateUp: new Date()
         })
         
         newMarca.save().then(savedMarca => {
             res.send(savedMarca)
         })
         


}

//creacion con JWT 

const createMarcaJWT = async(req = request,
    res = response) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeMarca = await Marca.findOne({name: req.body.name})
        if(existeMarca){
            return res.status(400).send("Marca ya existe");
        }

        let marca = new Marca();

        marca.name = req.body.name;
        marca.estado = req.body.estado || true;
        marca.date = new Date();
        marca.dateUp = new Date();



        marca = await marca.save();

        res.send(marca);


    }catch(error){
        console.log(error);
        res.status(500).json({mensaje: "Internal server error"});
    }
}

const getMarcaJWT = async (req= request, res = response) => {

    try{

        const marcas = await Marca.find({})
        res.json(marcas);

    }catch(error){
        res.status(500).send("Ocurrio un error")
    }
}

/**
 * Edición
 */

const editarMarca = (req = request,
    res = response, next) => {
    
        const {id} = req.params

        const marca = req.body
        const newMarcaInfo = {
            name: marca.name,
            estado: marca.estado || false,
        }
        Marca.findByIdAndUpdate(id, newMarcaInfo, { new: true})
        .then(result => {
            res.json(result)
        })
}


/**
 * Listar todos
 */
const getMarca = (req = request,
    res = response) => {
    
        Marca.find({}).then(equipos => {
            res.json(equipos)
        })
}

const getMarcaId = (req = request,
    res = response, next) => {
    
        const {id} = req.params
        //const student = students.find( c => c.id === parseInt(req.params.id))
        Marca.findById(id).then(equipo => {
            if (equipo){ return res.json(equipo) 
            } else { res.status(404).send("Equipo no encontrado");
        
        }}).catch(error => {
            next(error)
        })
    }

    /**
 * Eliminar
 */
    const deleteMarca = (req = request,
        res = response, next) => {
        
            const {id} = req.params
    
    Marca.findByIdAndDelete(id).then(resultado => {
        res.status(204).end()
    }).catch(error => next(error))
    }
    

module.exports = {createMarca, createMarcaJWT,  getMarca, getMarcaJWT, getMarcaId, editarMarca, deleteMarca}
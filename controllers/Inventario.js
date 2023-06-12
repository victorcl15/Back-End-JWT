const Inventario = require('../models/Inventario')
const {request, response} = require('express')
const estadoEquipo = require('../models/estadoEquipo')
const Equipo = require('../models/Equipo')
const Usuario = require('../models/Usuario')
const Marca = require('../models/Marca')
const { validationResult, check } = require("express-validator");



/**
 * Creación
 */
const createInventario = async (req = request,
    res = response) => {
    
try{


        const data = req.body
        

        const {usuario, marca, estado, equipo} = data

        const usuariodb = Usuario.findOne({_id: usuario._id,
        estado: true})

        if(!usuariodb){
            return res.status(400).json({msg: "Usuario invalido"})
        }

        const marcadb = Marca.findOne({
            _id: marca._id,
            estado: true
        })
        if(!marcadb){
            return res.status(400).json({msg: "marca invalida"})
        }
        //estado
        const estadodb = estadoEquipo.findOne({
            _id: estado._id,
            estado: true
        })
        if(!estadodb){
            return res.status(400).json({msg: "estado del equipo invalida"})
        }
        //equipo
        const equipo_db = Equipo.findOne({
            _id: equipo._id,
            estado: true
        })
        if(!equipo_db){
            return res.status(400).json({msg: "equipo invalido"})
        }

        const inventario = new Inventario(data)
        await inventario.save()
        return res.status(201).json(inventario)

    }catch(e){
        return res.status(500).json({
            msg: "Error general " + e
        })
    }
        /*
        const newInventario = new Inventario ({
    
             name: req.body.name,
             estado: req.body.estado || false,
             date: new Date(),
             dateUp: new Date()
    
         } )
         */
         /*
         const validarInventario = await Inventario.findOne({name})

         if (validarInventario){
            return console.log("Ya existe")
         }

         newInventario.save().then(savedInventario => {
             res.send(savedInventario)
         })
         
*/

}

//creacion con JWT

const createInventarioJWT = async(req = request,
    res = response) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeInventario = await Inventario.findOne({serial: req.body.serial})
        if(existeInventario){
            return res.status(400).send("Serial ya existe");
        }

        let inventario = new Inventario();

        inventario.serial= req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descrip = req.body.descrip;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario;
        inventario.marca = req.body.marca;
        inventario.estado = req.body.estado;
        inventario.equipo = req.body.equipo;

        inventario = await inventario.save();

        res.send(inventario);


    }catch(error){
        console.log(error);
        res.status(500).json({mensaje: "Internal server error"});
    }
}


/**
 * Edición
 */

const EditarInventario = (req = request,
    res = response) => {
    
        const {id} = req.params

        const info = req.body
        const newInventarioInfo = {
            serial: info.serial,
            modelo: info.modelo,
            descrip: info.descrip,
            foto: info.foto,
            color: info.color,
            fechaCompra: info.fechaCompra,
            precio: info.precio,
            usuario: info.usuario,
            marca: info.marca,
            estado: info.estado,
            equipo: info.equipo
        }
        Inventario.findByIdAndUpdate(id, newInventarioInfo, { new: true})
        .then(result => {
            res.json(result)
        }).catch(error => {
            console.error(error)
        })
}


/*
 * Listar todos
 */
const getInventarios = (req = request,
    res = response) => {
    
        Inventario.find({}).populate({
            path: "usuario",
            match: {estado: true}
        }).populate({path: "marca",
        match: {estado: true}}).populate({path: "estado",
        match: {estado: true}}).populate({path: "equipo",
        match: {estado: true}}).then(equipos => {
            res.json(equipos)
        })
}

const getInventarioJWT = async (req= request, res = response) => {
   

    try{

        const inventarios = await Inventario.find({}).populate({
            path: "usuario",
            match: {estado: true}
        }).populate({path: "marca",
        match: {estado: true}}).populate({path: "estado",
        match: {estado: true}}).populate({path: "equipo",
        match: {estado: true}})
          
        res.json(inventarios);

    }catch(error){
        res.status(500).send("Ocurrio un error")
    }
}

const getInventarioId = (req = request,
    res = response, next) => {
    
        const {id} = req.params
        //const student = students.find( c => c._id === parseInt(req.params._id))
        Inventario.findById(id).then(equipo => {
            if (equipo){ return res.json(equipo) 
            } else { res.status(404).send("Equipo no encontrado");
        
        }}).catch(error => {
            next(error)
        })
    }

    /**
 * Eliminar
 */
    const deleteInventario = (req = request,
        res = response, next) => {
        
            const {id} = req.params
    
    Inventario.findByIdAndDelete(id).then(resultado => {
        res.json(resultado)
    }).catch(error => next(error))
    }
    

module.exports = {createInventario, createInventarioJWT, getInventarios, getInventarioJWT, getInventarioId, EditarInventario, deleteInventario}
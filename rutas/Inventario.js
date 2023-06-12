const { Router } = require('express')
const { createInventario, createInventarioJWT, getInventarios, getInventarioJWT, getInventarioId, EditarInventario, 
    deleteInventario } = require('../controllers/Inventario')
const app = require("../app")
const notFound = require("../middleware/notFound");
const handleErrors = require("../middleware/handleErrors");
const {validarRolAdmin } = require("../middleware/validar-rol-admin")
const {validarJWT} = require("../middleware/validarjwt")
const { validationResult, check } = require("express-validator");


const router = Router()


// crear
//router.post('/inventary', createInventario)

router.post("/", [
    check("serial", "invalid.serial").not().isEmpty(),
    check("modelo", "invalid.modelo").not().isEmpty(),
    check("descrip", "invalid.descrip").not().isEmpty(),
    check("foto", "invalid.foto").not().isEmpty(),
    check("color", "invalid.color").not().isEmpty(),
    check("fechaCompra", "invalid.fechaCompra").not().isEmpty(),
    check("precio", "invalid.precio").not().isEmpty(),
    check("usuario", "invalid.usuario").not().isEmpty(),
    check("marca", "invalid.marca").not().isEmpty(),
    check("estado", "invalid.estado").not().isEmpty(),
    check("equipo", "invalid.equipo").not().isEmpty(),

    validarJWT, validarRolAdmin
    
], createInventarioJWT)
router.get("/mostrar", [validarJWT], getInventarioJWT)

// editar
//router.put('/', updateTipoInventario)
router.put('/:id', EditarInventario)

// listar
//router.get('/mostrar', getInventarios)

router.get('/:id', getInventarioId)

//Eliminar
router.delete('/:id', deleteInventario)


//app.use(notFound)
//app.use(handleErrors)



module.exports = router
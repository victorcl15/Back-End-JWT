const { Router } = require('express')
const { createEstadoEquipos, createEstadoEquipoJWT, getEstadoEquipos,getEstadoEquipoJWT, getEstadoEquiposId, EditarEstadoEquipos, 
    deleteEstadoEquipos } = require('../controllers/estadoEquipo')
const app = require("../app")
const notFound = require("../middleware/notFound");
const handleErrors = require("../middleware/handleErrors");
const {validarJWT} = require("../middleware/validarjwt")
const {validarRolAdmin } = require("../middleware/validar-rol-admin")
const { validationResult, check } = require("express-validator")


const router = Router()


// crear
//router.post('/', createEstadoEquipos)

router.post("/", [
    check("name", "invalid.name").not().isEmpty(),

    validarJWT, validarRolAdmin
    
], createEstadoEquipoJWT)

router.get("/mostrar", [validarJWT, validarRolAdmin], getEstadoEquipoJWT)

// editar
//router.put('/', updateTipoEquipo)
router.put('/:id', [validarJWT, validarRolAdmin], EditarEstadoEquipos)

// listar
//router.get('/mostrar', [validarJWT], getEstadoEquipos)

router.get('/:id', getEstadoEquiposId)

//Eliminar
router.delete('/:id', deleteEstadoEquipos)


//app.use(notFound)
//app.use(handleErrors)



module.exports = router
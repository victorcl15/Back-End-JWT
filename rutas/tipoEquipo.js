const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, getTipoEquipoJWT, getTipodeEquiposId, EditarTipodeEquipo, 
    deleteTipoEquipos, createTipoEquipoJWT} = require('../controllers/tipoEquipo')
const app = require("../app")
const notFound = require("../middleware/notFound");
const handleErrors = require("../middleware/handleErrors");
const {validarRolAdmin } = require("../middleware/validar-rol-admin")
const {validarJWT} = require("../middleware/validarjwt")
const { validationResult, check } = require("express-validator");


const router = Router()


// crear
router.post('/', [
    check("name", "invalid.name").not().isEmpty(),
    
    validarJWT, validarRolAdmin
    
], createTipoEquipoJWT)

router.get("/mostrar", [validarJWT, validarRolAdmin], getTipoEquipoJWT)

// editar
//router.put('/', updateTipoEquipo)
router.put('/:id', [validarJWT, validarRolAdmin], EditarTipodeEquipo)

// listar
//router.get('/mostrar', getTipoEquipos)

router.get('/:id', getTipodeEquiposId)

//Eliminar
router.delete('/:id', deleteTipoEquipos)


//app.use(notFound)
//app.use(handleErrors)



module.exports = router
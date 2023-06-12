const { Router } = require('express')
const { createMarca, getMarca, getMarcaJWT, getMarcaId, editarMarca, 
    deleteMarca, createMarcaJWT } = require('../controllers/Marca')
const app = require("../app")
const notFound = require("../middleware/notFound");
const handleErrors = require("../middleware/handleErrors");
const Marca = require('../models/Marca');
const {validarRolAdmin } = require("../middleware/validar-rol-admin")
const {validarJWT} = require("../middleware/validarjwt")
const { validationResult, check } = require("express-validator");


const router = Router()


// crear
router.post('/',[

    check("name", "invalid.name").not().isEmpty(),
    
    validarJWT, validarRolAdmin
    ], createMarcaJWT)

    router.get("/mostrar", [validarJWT, validarRolAdmin], getMarcaJWT)


// editar
//router.put('/', updateTipoEquipo)
router.put('/:id', [validarJWT, validarRolAdmin], editarMarca)

// listar
//router.get('/mostrar', getMarca)

router.get('/:id', getMarcaId)

//Eliminar
router.delete('/:id', deleteMarca)


//app.use(notFound)
//app.use(handleErrors)



module.exports = router
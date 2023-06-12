const { Router } = require('express')
const { createUsuario, createUsuarioJWT, getUsuario, getUsuarioJWT, getUsuarioId, editarUsuario, 
    deleteUsuario } = require('../controllers/Usuario')

const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs")
const {validarJWT} = require("../middleware/validarjwt")

const app = require("../app")
const notFound = require("../middleware/notFound");
const handleErrors = require("../middleware/handleErrors");
const Usuario = require('../models/Usuario');
const {validarRolAdmin} = require("../middleware/validar-rol-admin")


const router = Router()


// crear
//router.post('/', createUsuario)

router.post("/", [
    check("name", "invalid.name").not().isEmpty(),
    check("email", "invalid.email").isEmail(),
    check("password", "invalid.password").not().isEmpty(),
    check("rol", "invalid.rol").isIn(["Administrador", "Docente"]),
    validarJWT, validarRolAdmin
    
], createUsuarioJWT)

router.get("/mostrar", [validarJWT, validarRolAdmin], getUsuarioJWT)


// editar
//router.put('/', updateTipoEquipo)
router.put('/:id', [validarJWT, validarRolAdmin], editarUsuario)

// listar
//router.get('/mostrar', getUsuario)

router.get('/:id', getUsuarioId)

//Eliminar
router.delete('/:id', deleteUsuario)


//app.use(notFound)
//app.use(handleErrors)



module.exports = router
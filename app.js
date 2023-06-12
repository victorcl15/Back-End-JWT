const express = require('express')
const app = express()
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");
const cors = require("cors")

app.use(express.json());

// implementacion de cors,  atraves del middleware
app.use(cors())

const tipoEquipo = require('./rutas/tipoEquipo')
const estadoEquipo = require("./rutas/estadoEquipo")
const Usuario = require("./rutas/Usuario")
const Marca = require("./rutas/Marca");
const Inventario = require('./rutas/Inventario');


// URI o endpoint
app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estadoequipos', estadoEquipo)
app.use('/api/usuarios', Usuario)
app.use('/api/marcas', Marca)
app.use('/api/inventarios', Inventario)

//-------------

//app.use("/usuario", require("./rutas/Usuario"));
app.use("/auth", require("./rutas/auth"));


app.use(notFound)
app.use(handleErrors)


module.exports = app
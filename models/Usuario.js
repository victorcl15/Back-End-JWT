const {Schema, model} = require("mongoose")
//Definición de esquema / plantilla de datos
const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    password: {type: String, required: true},
    rol: {type: String, required: true, enum: ['Administrador', 'Docente']},
    estado: Boolean,
    date: Date,
    dateUp: Date
})


usuarioSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo, que permite crear una clase para tener instancias 
const Usuario = model("Usuario", usuarioSchema)

/*
Usuario.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})


const equipo = new Usuario({
    name: "Movil",
    estado: true,
    date: new Date(),
    dateUp: new Date()

})

equipo.save()
.then(result => {
    console.log(result)
    mongoose.connection.close()
}).catch(error => {
    console.error(error)
})
*/
module.exports = Usuario
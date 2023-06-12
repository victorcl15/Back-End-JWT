const {Schema, model} = require("mongoose")
//Definición de esquema / plantilla de datos
const estadoequipoSchema = new Schema({
    name: String,
    estado: Boolean,
    date: Date,
    dateUp: Date
})


estadoequipoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo, que permite crear una clase para tener instancias 
const estadoEquipo = model("estadoEquipo", estadoequipoSchema)

/*
Equipo.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})


const equipo = new Equipo({
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
module.exports = estadoEquipo
const {Schema, model} = require("mongoose")
//Definición de esquema / plantilla de datos
const equipoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nombre requerido"]
    },
    estado: Boolean,
    date: Date,
    dateUp: Date
})


equipoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo, que permite crear una clase para tener instancias 
const Equipo = model("Equipo", equipoSchema)

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
module.exports = Equipo
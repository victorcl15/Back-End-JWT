const {Schema, model} = require("mongoose")
//Definición de esquema / plantilla de datos
const marcaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    estado: Boolean,
    date: Date,
    dateUp: Date
})


marcaSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo, que permite crear una clase para tener instancias 
const Marca = model("Marca", marcaSchema)

/*
Marca.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})


const equipo = new Marca({
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
module.exports = Marca
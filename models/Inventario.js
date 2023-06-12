const {Schema, model} = require("mongoose")
//Definición de esquema / plantilla de datos
const inventarioSchema = new Schema({
    serial: {
        type: String,
        required: [true, "Serial requerido"],
        unique: [true, "equipo en uso"]
    },
    modelo: {
        type: String,
        required: [true, "modelo requerido"],
        unique: [true, "modelo debe ser unico"]
    },
    descrip: {
        type: String

    },
    foto: {
        type: String
    },
    color: {
        type: String
    },
    fechaCompra: {
        type: Date
    },
    precio: {
        type: Number
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: "Marca",
        required: true
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: "estadoEquipo",
        required: true
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: "Equipo",
        required: true
    }

})


inventarioSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//crear modelo, que permite crear una clase para tener instancias 
const Inventario = model("Inventario", inventarioSchema)

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
module.exports = Inventario
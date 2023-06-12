require("dotenv").config()
require("./mongo")


//const express = require("express");
//const app = express();
const app = require("./app")
//const cors = require("cors")
//const Equipo = require("./models/Equipo");
//const notFound = require("./middleware/notFound");
//const handleErrors = require("./middleware/handleErrors");



/*
app.use(cors())

app.use(express.json());

//let equipos = []


app.get("/", (req, res) => {
    res.send("Node JS api")
    
})


app.get("/api/equipos", (req, res) => {
    Equipo.find({}).then(equipos => {
        res.json(equipos)
    })
   
    //console.log("funciono")
    //res.json(students)
    //res.send("<h1>probando</h1>")
})

app.get("/api/equipos/:id", (req, res, next) => {
    
    const {id} = req.params
    //const student = students.find( c => c.id === parseInt(req.params.id))
    Equipo.findById(id).then(equipo => {
        if (equipo){ return res.json(equipo) 
        } else { res.status(404).send("Equipo no encontrado");
    
    }}).catch(error => {
        next(error)
    })

    

})

app.post("/api/equipos", (req, res) => {

     //const enviar_info = req.body 
     // mejor forma para luego validar -- { name: enviar_info.name} etc

  //  const ids = students.map(stu => stu.id)
   // const maxId = Math.max(...ids)
const newEquipo = new Equipo ({
    
   // id: students.length + 1,
   // id: maxId +1,
    name: req.body.name,
    estado: req.body.estado || false,
    date: new Date(),
    dateUp: new Date()
})

newEquipo.save().then(savedEquipo => {
    res.send(savedEquipo)
})
//console.log(req.body.life)
// students = [...students, student]
//students.push(student)

})

app.put("/api/equipos/:id", (req, res, next) => {
    const {id} = req.params

    const equipo = req.body
    const newEquipoInfo = {
        name: equipo.name,
        estado: equipo.estado || false,
    }
    Equipo.findByIdAndUpdate(id, newEquipoInfo, { new: true})
    .then(result => {
        res.json(result)
    })
})

app.delete ("/api/equipos/:id", (req, res, next) => {

    const {id} = req.params
    
    Equipo.findByIdAndDelete(id).then(resultado => {
        res.status(204).end()
    }).catch(error => next(error))
  
})

app.use(notFound)
app.use(handleErrors)
*/

const port = process.env.port;

app.listen(port, () => console.log(`escuchando en puerto ${port}...`))



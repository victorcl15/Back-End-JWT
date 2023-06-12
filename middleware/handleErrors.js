module.exports = (error, req, res, next) => {

    if(error.name === "CastError"){
        res.status(400).send({error: "La id esta mal formada"})
    } else {
        res.status(500).json({
            error: "Fallo del servidor" + error
        })
    }
    
}
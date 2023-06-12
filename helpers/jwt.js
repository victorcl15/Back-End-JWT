

const jwt = require("jsonwebtoken")

const generarjwt = (usuario) => {
    const payload = {_id: usuario._id, name: usuario.name, email: usuario.email,
    password: usuario.password, rol: usuario.rol}

    const token = jwt.sign(payload, "123456", {expiresIn: "1h"});
    return token;
}

module.exports = {
    generarjwt
}
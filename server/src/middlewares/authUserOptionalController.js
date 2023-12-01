//Importamos las dependencias.
const jwt = require('jsonwebtoken');

//Importamos las funciones de error.
const { invalidTokenError } = require('../services/errorService');

//Función controladora intermedia que comprueba OPCIONALMENTE si el usuario está logueado y crea la propiedad user en el objeto request.
const authUserOptionalController = async (req, res, next) => {
    try {
        //Obtenemos el token de la cabecera de la petición.
        const { authorization } = req.headers;

        //Si existe token creamos la propiedad user en el objeto request.
        if (authorization) {
            let userInfo;
            try {
                userInfo = jwt.verify(authorization, process.env.SECRET);

                //Agregamos una nueva propiedad inventada por nosotros al objeto "request".
                req.user = userInfo;
            } catch (err) {
                console.error(err);
                invalidTokenError();
            }
        }

        //Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUserOptionalController;

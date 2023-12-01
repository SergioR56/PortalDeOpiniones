//Importamos las dependencias.
const jwt = require('jsonwebtoken');

//Importamos las funciones de error.
const {
    notAuthenticatedError,
    invalidTokenError,
} = require('../services/errorService');

//Función controladora intermedia que comprueba si el usuario está logueado y crea la propiedad user en el objeto request.
const authUserController = async (req, res, next) => {
    try {
        //Obtenemos el token de la cabecera de la petición.
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError;
        }
        //Variable que almacenará la información del token una vez desencriptado.
        let userInfo;
        try {
            userInfo = jwt.verify(authorization, process.env.SECRET);

            //Agregamos una nueva propiedad inventada por nosotros al objeto "request".
            req.user = userInfo;
            req.userId = userInfo.id;

            //Pasamos el control a la siguiente función controladora.
            next();
        } catch (err) {
            console.error(err);
            invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = authUserController;

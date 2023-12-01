//Importamos los modelos.
const insertUserModel = require('../../models/users/insertUserModel');

//Importamos la función que valida los esquemas.
const validateSchema = require('../../utils/validateSchema');

//Importamos el equema de Joi.
const newUserSchema = require('../../schemas/users/newUserSchema');

//Función controladora final que inserta un nuevo usuario.
const newUserController = async (req, res, next) => {
    try {
        //Importamos los datos del body.
        const { username, email, password } = req.body;

        //Validamos los datos con Joi.
        await validateSchema(newUserSchema, req.body);

        //Insertamos el usuario.
        await insertUserModel(username, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;

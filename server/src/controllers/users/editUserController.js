//Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserModel = require('../../models/users/updateUserModel');

//Importamos la función que valida los esquemas.
const validateSchema = require('../../utils/validateSchema');

//Importamos el esquema de Joi.
const updateUserSchema = require('../../schemas/users/updateUserSchema');

//Importamos bcrypt para encriptar la contraseña.
const bcrypt = require('bcrypt');

//Función controladora final que edita los datos de un usuario.
const editUserController = async (req, res, next) => {
    try {
        //Validamos los datos con joi.
        await validateSchema(updateUserSchema, req.body);

        const user = await selectUserByIdModel(req.user.id);

        req.body.username = req.body.username || user.username;
        req.body.email = req.body.email || user.email;
        req.body.password = req.body.password || user.password;

        if (req.body.username !== user.username) {
            user.username = req.body.username;
        }
        if (req.body.email !== user.email) {
            user.email = req.body.email;
        }
        if (req.body.password !== user.password) {
            user.password = req.body.password;
            user.password = await bcrypt.hash(user.password, 10);
        }

        await updateUserModel(user);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
        });
    } catch (err) {
        next(err);
    }
};
module.exports = editUserController;

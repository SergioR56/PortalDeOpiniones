//Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserModel = require('../../models/users/updateUserModel');

//Importamos la función que valida los esquemas.
const validateSchema = require('../../utils/validateSchema');

//Importamos el esquema de Joi.
const updateUserSchema = require('../../schemas/users/updateUserSchema');

//Importamos bcrypt para encriptar la contraseña.
const bcrypt = require('bcrypt');

//Errores
const { sameUserDataError } = require('../../services/errorService');

//Función controladora final que edita los datos de un usuario.
const editUserController = async (req, res, next) => {
    try {
        //Validamos los datos con joi.
        await validateSchema(updateUserSchema, req.body);

        //Obtenemos los datos de usuario.
        const user = await selectUserByIdModel(req.user.id);

        //En caso de no existir un valor req.body.username le asignamos el valor existente del user.
        req.body.username = req.body.username || user.username;
        req.body.email = req.body.email || user.email;
        req.body.password = req.body.password || user.password;


        //Comprobamos si el username que ha insertado el usuario es el mismo.
        const validUserName = req.body.username === user.username;
        //Comprobamos si el email que ha insertado el usuario es el mismo.
        const validEmail = req.body.email === user.email;
        //Comprobamos si la contraseña que ha insertado el usuario es la misma.
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        //Si todos los datos son iguales lanzamos un error.
        if (validUserName && validEmail && validPassword) {
            sameUserDataError();
        } else {
                //Verificar si el username ha cambiado.
                if (req.body.username !== user.username) {
                    //Actualizamos el username.
                    user.username = req.body.username;
                }
                //Verificar si el email ha cambiado.
                if (req.body.email !== user.email) {
                    //Actualizamos el email.
                    user.email = req.body.email;
                }
                //Verificar si la contraseña ha cambiado.
                if (req.body.password !== user.password) {
                    //Logica para manejar cambio de contraseña encriptada.
                    user.password = req.body.password;
                    user.password = await bcrypt.hash(user.password, 10);
                }
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

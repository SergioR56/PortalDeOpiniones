//Importamos las dependencias.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Importamos los modelos.
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');

//Importamos la función que valida los esquemas.
const validateSchema = require('../../utils/validateSchema');

//Importamos el esquema de Joi.
const loginUserSchema = require('../../schemas/users/loginUserSchema');

//Importamos las funciones de error.
const { invalidCredentialsError } = require('../../services/errorService');

//Función controladora final que logea a un usuario.
const loginUserController = async (req, res, next) => {
    try {
        //Obtenemos los datos necesarios del body.
        const { email, password } = req.body;

        //Validamos los datos del body con joi.
        await validateSchema(loginUserSchema, req.body);

        //Obtenemos los datos del usuario.
        const user = await selectUserByEmailModel(email);
        //Comprobamos si la contraseña que ha insertado el usuario es correcta.
        const validPassword = await bcrypt.compare(password, user.password);

        //Si la contraseña no coincide lanzamos un error.
        if (!validPassword) {
            invalidCredentialsError();
        }

        //Generamos un objeto con la información que queramos agregar al token.
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        //Generamos el token.
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUserController;

//Importamos los modelos.
const insertPostModel = require('../../models/posts/insertPostModel');

//Importamos la función que valida los esquemas y la función que guarda fotos en disco.
const validateSchema = require('../../utils/validateSchema');
const savePhoto = require('../../utils/savePhoto');

//Importamos el esquema de Joi.
const newPostSchema = require('../../schemas/posts/newPostSchema');

//Función controladora final que inserta un nuevo usuario.
const newPostController = async (req, res, next) => {
    try {
        const { text } = req.body;

        //Validamos los datos del body y de files con joi.
        await validateSchema(newPostSchema, {
            ...req.body,
            ...req.files,
        });

        //Variable que almacenará el nombre de la imagen (si hay).
        let imgName;

        //Si existe imagen la guardamos en disco y obtenemos su nombre.
        if (req.files?.image) {
            imgName = await savePhoto(req.files.image, 500);
        }

        //Creamos el post en la base de datos y obtenemos su id.
        const postId = await insertPostModel(text, imgName, req.user.id);

        res.send({
            status: 'ok',
            data: {
                post: {
                    id: postId,
                    userId: req.user.id,
                    text,
                    image: imgName || null,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newPostController;

//Importamos los modelos.
const insertLikeModel = require('../../models/posts/insertLikeModel');

//Función controladora final que inserta un nuevo like.
const newLikeController = async (req, res, next) => {
    try {
        //Obtenemos el id del post sobre el que queremos dar like.
        const { postId } = req.params;

        await insertLikeModel(postId, req.user.id);

        res.send({
            status: 'ok',
            message: 'Like agregado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newLikeController;

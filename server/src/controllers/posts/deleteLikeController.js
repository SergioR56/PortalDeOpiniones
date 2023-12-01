// Importamos los modelos.
const deleteLikeModel = require('../../models/posts/deleteLikeModel');

// Función controladora final que elimina un like.
const deleteLikeController = async (req, res, next) => {
    try {
        // Obtenemos el id del post donde queremos eliminar el like.
        const { postId } = req.params;

        await deleteLikeModel(postId, req.user.id);

        res.send({
            status: 'ok',
            message: 'Like eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteLikeController;

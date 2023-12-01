//Importamos los modelos.
const deletePostModel = require('../../models/posts/deletePostModel');

//Función controladora final que elimina un post.
const deletePostController = async (req, res, next) => {
    try {
        //Obtenemos el id del post que queremos eliminar.
        const { postId } = req.params;

        await deletePostModel(postId, req.user.id);

        res.send({
            status: 'ok',
            message: 'Post eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deletePostController;

//Importamos los modelos.
const selectAllPostsModel = require('../../models/posts/selectAllPostsModel');

//Función controladora final que selecciona todos los posts.
const listPostsController = async (req, res, next) => {
    try {
        //Obtenemos el query param correspondiente.
        const { keyword } = req.query;

        const posts = await selectAllPostsModel(keyword, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listPostsController;

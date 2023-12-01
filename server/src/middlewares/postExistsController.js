//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../db/getDb');

//Importamos las funciones de error.
const { notFoundError } = require('../services/errorService');

//Función controladora intermedia que se conectará a la base de datos y comprobará si existe un post con el id que obtenemos por path params.
const postExistsController = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const { postId } = req.params;

        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE id=?`,
            [postId]
        );

        if (posts.length < 1) {
            notFoundError('Post');
        }

        //Pasamos el control al siguiente middleware.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = postExistsController;

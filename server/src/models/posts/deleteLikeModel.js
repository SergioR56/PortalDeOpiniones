//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Importamos las funciones de error.
const { notFoundError } = require('../../services/errorService');

//Función que se conectará a la base de datos y eliminará un nuevo like.
const deleteLikeModel = async (postId, userId) => {
    let connection;

    try {
        connection = await getDb();

        //Comprobamos si el usuario ya ha dado like al post.
        const [likes] = await connection.query(
            'SELECT id FROM likes WHERE postId = ? AND userId = ?',
            [postId, userId]
        );

        if (likes.length < 1) {
            notFoundError('Like');
        }

        await connection.query(
            'DELETE FROM likes WHERE postId = ? AND userId = ?',
            [postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteLikeModel;

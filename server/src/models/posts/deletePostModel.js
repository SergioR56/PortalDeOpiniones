//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Importamos las funciones de error.
const { unauthorizedUserError } = require('../../services/errorService');

//Función que se conectará a la base de datos y eliminará un post.
const deletePostModel = async (postId, userId) => {
    let connection;

    try {
        connection = await getDb();

        const [posts] = await connection.query(
            `SELECT userId FROM posts WHERE id=?`,
            [postId]
        );

        //Si no somos los dueños del post lanzamos un error.
        if (posts[0].userId !== userId) {
            unauthorizedUserError();
        }

        //Eliminamos los likes del post antes de borrar el post, de lo contrario SQL no nos dejará eliminar el post.
        await connection.query(`DELETE FROM likes WHERE postId=?`, [postId]);

        //Eliminamos el post.
        await connection.query(`DELETE FROM posts WHERE id=?`, [postId]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deletePostModel;

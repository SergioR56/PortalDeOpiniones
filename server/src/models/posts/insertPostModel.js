//Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require('../../db/getDb');

//Función que se conectará a la base de datos y creará un post.
const insertPostModel = async (text, img, userId) => {
    let connection;

    try {
        connection = await getDb();

        const [post] = await connection.query(
            `INSERT INTO posts (text, image, userId) VALUES (?, ?, ?)`,
            [text, img, userId]
        );

        //Retornamos el id del post que acabamos de insertar.
        return post.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPostModel;

//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Función que se conectará a la base de datos y actualizará el avatar de un usuario.
const updateAvatarModel = async (avatarName, userId) => {
    let connection;

    try {
        connection = await getDb();

        await connection.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
            avatarName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateAvatarModel;

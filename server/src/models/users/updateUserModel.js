//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Función que se conectará a la base de datos y actualizará los datos del usuario.
const updateUserModel = async (user) => {
    let connection;

    try {
        connection = await getDb();

        await connection.query(
            `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
            [user.username, user.email, user.password, user.id]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserModel;

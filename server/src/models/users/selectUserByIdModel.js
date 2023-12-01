//Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

//Importamos las funciones de error.
const { notFoundError } = require('../../services/errorService');

//Función que se conectará a la base de datos y devolverá los datos de un usuario.
const selectUserByIdModel = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            notFoundError('user');
        }

        //Dado que no puede existir más de un usuario con un email determinado, en caso de que en el array de usuarios haya algún usuario este estará en la posición 0.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};
module.exports = selectUserByIdModel;

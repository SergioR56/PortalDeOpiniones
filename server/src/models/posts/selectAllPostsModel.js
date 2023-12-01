//Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require('../../db/getDb');

//Función que se conectará a la base de datos y devolverá todos los posts.
const selectAllPostsModel = async (keyword = '', userId = 0) => {
    let connection;

    try {
        connection = await getDb();

        const [posts] = await connection.query(
            `    
                SELECT 
                   p.id,
                   p.text,
                   p.image,
                   p.userId,
                   u.username,
                   p.userId = ? AS owner,
                   COUNT(l.id) AS likes,
                   BIT_OR(l.userId = ?) AS likedByMe,
                   p.createdAt
                FROM posts p
                INNER JOIN users u ON u.id = p.userId
                LEFT JOIN likes l ON l.postId = p.id
                WHERE u.username LIKE ? OR p.text LIKE ?
                GROUP BY p.id
                ORDER BY likes DESC, p.createdAt DESC`,
            [userId, userId, `%${keyword}%`, `%${keyword}%`]
        );

        for (const post of posts) {
            post.owner = Boolean(post.owner);
            post.likedByMe = Boolean(post.likedByMe);
        }

        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPostsModel;

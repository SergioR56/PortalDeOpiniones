//Importamos express y creamos un router.
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras intermedias.
const {
    authUserController,
    authUserOptionalController,
    postExistsController,
} = require('../middlewares');

//Importamos las funciones controladoras finales.
const {
    newPostController,
    newLikeController,
    deleteLikeController,
    listPostsController,
    deletePostController,
} = require('../controllers/posts');

//Insertar comentario
router.post('/posts', authUserController, newPostController);

//Insertar like
router.post(
    '/posts/:postId/likes',
    authUserController,
    postExistsController,
    newLikeController
);

//Eliminar like
router.delete(
    '/posts/:postId/likes',
    authUserController,
    postExistsController,
    deleteLikeController
);

//Listado de posts con filtros.
router.get('/posts', authUserOptionalController, listPostsController);

//Eliminar post
router.delete(
    '/posts/:postId',
    authUserController,
    postExistsController,
    deletePostController
);

module.exports = router;

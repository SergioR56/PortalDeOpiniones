//Importamos express y creamos un router.
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras intermedias.
const { authUserController }= require('../middlewares');

//Importamos las funciones controladoras finales.
const {
    newUserController,
    loginUserController,
    editUserController,
    getUserController,
    editAvatarController,
} = require('../controllers/users');

//Registro de usuario
router.post('/users/register', newUserController);

// Login de usuario
router.post('/users/login', loginUserController);

// Editar nombre de usuario
router.put('/users/update', authUserController, editUserController);

// Editar avatar
router.put('/users/avatar', authUserController, editAvatarController);

// Información de usuario
router.get('/users', authUserController, getUserController);

module.exports = router;

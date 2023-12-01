//Importamos las variables de entorno en nuestro fichero ".env".
require('dotenv').config();

//Importamos las dependencias.
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

//Importamos la constante que contiene el nombre de la carpeta de subida de archivos.
const { UPLOADS_DIR } = require('./src/utils/constants');

//Importamos las rutas.
const routes = require('./src/routes');

//Importamos las funciones controladoras de errores.
const {
    errorController,
    notFoundController,
} = require('./src/controllers/errors');

//Creamos el servidor.
const app = express();

//Middleware que indica a Express cual es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));

//Middleware que deserializa un body en formato "raw" creando la propiedad "body" en el objeto request
app.use(express.json());

//Middleware que deserializa un body en formato "form-data" creando la propiedad "body" y la propiedad "files" en el objeto "request".
app.use(fileUpload());

//Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con el servidor.
app.use(cors());

//Middleware que muestra por consola información de la petición entrante.
app.use(morgan('dev'));

//Middleware que indica a express donde se encuentran las rutas.
app.use(routes);

//Middleware de manejo de errores 404
app.use(notFoundController);

//Manejador de errores global
app.use(errorController);

//Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
});

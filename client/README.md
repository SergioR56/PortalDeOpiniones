# Portal-de-Opiniones

Este proyecto consiste en crear una API que funcione como un portal donde la gente pueda dar su opinión sobre cualquier tema.

## Instalar en client

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.local.example` como `.env.local` y cubrir los datos necesarios.
3. Ejecutar `npm run dev` para lanzar el servidor.

## Rutas Web

-   POST `/` - Pagina de inicio.
-   POST `/register` - Registro de usuario.
-   POST `/login` - Login de usuario (devuelve token).
-   PUT `/update` - Editar informacion de usuario.
-   POST `/message` - Enviar una opinion.



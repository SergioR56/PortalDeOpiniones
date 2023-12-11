//Importamos base del API.
const baseURL = import.meta.env.VITE_API_URL;

//Importamos la funcion que retorna el token.
import { getToken } from '../utils/getToken';

//Registro de usuario.
export const signUpService = async (username, email, password) => {
  const res = await fetch(`${baseURL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const body = await res.json();

  return body;
};

//Login de usuario
export const signInService = async (email, password) => {
  const res = await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const body = await res.json();

  return body;
};

//Obtener perfil privado de usuario
export const getPrivateProfileService = async () => {
  const token = getToken();

  const res = await fetch(`${baseURL}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();

  return body;
};

//Actualizar perfil de usuario
export const updateProfileService = async (
  username,
  email,
  password
) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/users/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const body = await res.json();

  return body;
};

//Importamos base del API.
const baseURL = import.meta.env.VITE_API_URL;

//Importamos la función que retorna el token.
import { getToken } from '../utils/getToken';

//Creación de post.
export const createPostService = async (formData) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/posts`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const body = await res.json();

  return body;
};

//Listar los posts.
export const listPostService = async (searchParams) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/posts?${searchParams}`, {
    headers: token ? { Authorization: token } : {},
  });

  const body = await res.json();

  return body;
};

//Dar o eliminar like de un post.
export const likePostService = async (postId, method) => {
  const token = getToken();

  const res = await fetch(`${baseURL}/posts/${postId}/likes`, {
    method,
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();

  return body;
};

//Eliminar un post.
export const deletePostService = async (postId) => {
  const token = getToken();
  
  const res = await fetch(`${baseURL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });

  const body = await res.json();

  return body;
};

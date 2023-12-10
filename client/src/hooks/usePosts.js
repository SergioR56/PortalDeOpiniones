//Importamos los hooks.
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

//Importamos los servicios.
import { listPostService } from '../services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Realizamos la petición para obtener los posts.
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const body = await listPostService(searchParams);

        setPosts(body.data.posts);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    //Llamamos a la función.
    fetchPosts();
  }, [searchParams]);

  //Funcion que modifica el State para agregar o eliminar un like.
  const likePostById = (postId) => {
    //Creamos un nuevo array donde modificaremos exclusivamente el post sobre el cual el usuario quiere agregar o eliminar un like.
    const newPosts = posts.map((post) => {
      //Si el id del post que estamos recorriendo coincide con el id del post sobre el que queremos dar o eliminar el like..
      if (post.id === postId) {
        //Invertimos el valor de likedByMe.
        const likedByMe = !post.likedByMe;

        //Incrementamsos o decrementamos el total de likes en funcion del valor de "likedByMe".
        const likes = likedByMe ? post.likes + 1 : post.likes - 1;

        return { ...post, likedByMe, likes };
      }

      //Retornamos el post actual sin modificar.
      return post;
    });
    //Actualizamos los posts con el nuevo array.
    setPosts(newPosts);
  };

  //Funcion que modifica el State para eliminar un post.
  const deletePostById = (postId) => {
    //Creamos un nuevo array en el que eliminamos unicamente el post en cuestion.
    const newPosts = posts.filter((post) => post.id !== postId);

    //Actualizamos los posts con el nuevo array.
    setPosts(newPosts);
  };

  return {
    posts,
    setSearchParams,
    likePostById,
    deletePostById,
    loading,
  };
};

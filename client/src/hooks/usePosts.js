//Importamos los hooks.
import { useEffect, useState } from 'react';

//Importamos los servicios.
import { listPostService } from '../services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Realizamos la petición para obtener los posts.
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const body = await listPostService();

        setPosts(body.data.posts);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    //Llamamos a la función.
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
  };
};

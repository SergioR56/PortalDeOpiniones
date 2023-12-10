//Importamos los prop-types.
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../utils/customPropTypes';

//Importamos los estilos.
import './PostFooter.css';

//Importamos los hooks.
import { useState } from 'react';

//Importamos los servicios.
import { likePostService, deletePostService } from '../../../services/postService';

const PostFooter = ({
  authUser,
  postId,
  owner,
  likes,
  likedByMe,
  likePostById,
  deletePostById,
}) => {
  const [loading, setLoading] = useState(false);

  //Función que modifica un like.
  const handleLikePost = async () => {
    try {
      setLoading(true);

      //Si existe un like previo eliminamos el like, de lo contrario lo creamos.
      const method = likedByMe ? 'delete' : 'post';

      //Modificamos el like en la base de datos.
      await likePostService(postId, method);

      //Modificamos el array de posts en el State.
      likePostById(postId);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función que elimina el post.
  const handleDeletePost = async () => {
    if (confirm('¿Deseas eliminar el post?')) {
      try {
        setLoading(true);

        // Eliminamos el post en la base de datos.
        await deletePostService(postId);

        // Modificamos el array de posts en el State.
        deletePostById(postId);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <footer className='post-footer'>
      <div>
        <div
          className={`heart ${likedByMe && 'like'}`}
          onClick={() => {
            //Si estamos logeados y loading no está establecido a true permitimos al usuario crear o eliminar el like.
            authUser && !loading && handleLikePost();
          }}
        ></div>
        <p>{likes}</p>
      </div>
      {authUser && owner && (
        <button onClick={() => handleDeletePost()}>Eliminar</button>
      )}
    </footer>
  );
};

PostFooter.propTypes = {
  authUser: userPropTypes,
  postId: PropTypes.number.isRequired,
  owner: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  likedByMe: PropTypes.bool.isRequired,
  likePostById: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
};

export default PostFooter;

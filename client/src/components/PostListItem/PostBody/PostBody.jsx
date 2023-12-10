//Importamos los prop-types.
import PropTypes from 'prop-types';

//Importamos los estilos.
import './PostBody.css';

//URL base del API.
const baseURL = import.meta.env.VITE_API_URL;

const PostBody = ({ text, image }) => {
  return (
    <div className='post-body'>
      <p>{text}</p>
      {image && (
        <img src={`${baseURL}/${image}`} 
        alt='Imagen adjunta' 
        />
      )}
    </div>
  );
};

PostBody.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default PostBody;

//Importamos los hooks.
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Importamos los servicios.
import { createPostService } from '../../services/postService';

//Funcion que permite previsualizar una imagen
import { handleAddFilePreview } from '../../utils/handleAddFilePreview';

//Importamos los estilos.
import './PostCreateForm.css';
import { handleRemoveFilePreview } from '../../utils/handleRemoveFilePreview';

const PostCreateForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  //Funcion que crea un post.
  const handlePostCreate = async () => {
    try {
      setLoading(true);

      //Creamos un objeto formData y establecemos sus propiedades.
      const formData = new FormData();
      formData.append('text', text);

      //Si existe un archivo, lo agregamos al formData.
      if (file) {
        formData.append('image', file);
      }

      //Creamos el post en la base de datos.
      await createPostService(formData);

      //Redirigimos a la pagina principal.
      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className='post-create-form'
      onSubmit={(e) => {
        e.preventDefault();
        handlePostCreate();
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength='500'
        autoFocus
        required
      />
      <div className='img-prev-container'>
        <button disabled={loading}>Enviar</button>

        <label htmlFor='file-input' className='custom-file-label'>
          Seleccionar archivo
        </label>
        <input
          type='file'
          id='file-input'
          ref={fileInputRef}
          accept='image/*'
          onChange={(e) => handleAddFilePreview(e, setFile, setPreviewUrl)}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            onClick={() => {
              handleRemoveFilePreview(fileInputRef, setFile, setPreviewUrl);
            }}
            alt='preview'
            title='Eliminar imagen'
          />
        )}
      </div>
    </form>
  );
};

export default PostCreateForm;

//Importamos los componentes.
import { Navigate } from 'react-router-dom';

//Importamos los hooks.
import { useAuth } from '../../hooks/useAuth';

//Importamos el formulario
import PostCreateForm from '../../forms/PostCreateForm/postCreateForm';

const PostCreatePage = () => {
  const { authUser } = useAuth();

  //Si la persona no esta logueada, redirigimos a la pagina de inicio.
  if (!authUser) return <Navigate to="/" />;

  return (
    <main>
      <PostCreateForm />
    </main>
  );
};

export default PostCreatePage;

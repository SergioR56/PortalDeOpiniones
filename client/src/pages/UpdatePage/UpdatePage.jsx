import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import UpdateForm from '../../forms/UpdateForm/UpdateForm';

const UpdatePage = () => {
  const { authUser, authUpdate, loading } = useAuth();


  // Si no estamos logeados redirigimos a la página principal.
  if (!authUser) return <Navigate to='/' />;

  return (
    <main>
      <h2>Actualizar perfil</h2>
      <UpdateForm
        authUser={authUser}
        authUpdate={authUpdate}
        loading={loading}
      />
    </main>
  );
};

export default UpdatePage;

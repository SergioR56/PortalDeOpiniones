//Importamos los hooks.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom'

//Importamos los componentes.
import RegisterForm from '../../forms/RegisterForm/RegisterForm';

const RegisterPage = () => {
  const { authUser, authRegister, loading } = useAuth();

  // Si estamos logeados redirigimos a la página principal.
  if (authUser) return <Navigate to='/' />;

  return (
    <main>
      <h2>Registro</h2>
      <RegisterForm authRegister={authRegister} loading={loading} />
      <li>
        Si ya te has registrado,<br></br>
        <NavLink to='/login'>Inicia Sesion</NavLink>
      </li>
    </main>
  );
};

export default RegisterPage;

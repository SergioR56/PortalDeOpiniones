//Importamos los hooks.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

//Importamos los componentes.
import LoginForm from '../../forms/LoginForm/LoginForm';

const LoginPage = () => {
  const { authUser, authLogin, loading } = useAuth();

  // Si estamos logeados redirigimos a la página principal.
  if (authUser) return <Navigate to='/' />;

  return (
    <main>
      <h2>Inicio de sesion</h2>
      <LoginForm authLogin={authLogin} loading={loading} />
      <li>
        Si no tienes cuenta,<br></br>
        <NavLink to='/register'>Registrate</NavLink>
      </li>
    </main>
  );
};

export default LoginPage;

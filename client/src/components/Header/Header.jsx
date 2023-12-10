//Importamos los estilos.
import './Header.css';

//Importamos los hooks.
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { authUser, authLogout } = useAuth();

  return (
    <header>
      <h1>
        <NavLink to='/'>Opinodromo</NavLink>
      </h1>
      <nav>
        <ul>
          {authUser && (
            <span>
              @{authUser.username}
            </span>
          )}

          {authUser && (
            <li>
              <NavLink to='/update'>Actualizar perfil</NavLink>
            </li>
          )}
          {authUser && (
            <button onClick={() => authLogout()}>
              <NavLink to='/logout'>Cerrar sesion</NavLink>
            </button>
          )}
          {!authUser && (
            <li>
              <NavLink to='/register'>Registro</NavLink>
            </li>
          )}
          {!authUser && (
            <li>
              <NavLink to='/login'>Inicio de sesion</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

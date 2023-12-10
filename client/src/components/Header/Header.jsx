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
          {authUser && <span>@{authUser.username}</span>}

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
          {authUser && (
            <li>
              <NavLink to='/message'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </NavLink>
              <span className='tooltip'>Post</span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

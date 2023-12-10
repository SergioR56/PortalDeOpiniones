// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { TOKEN_LOCAL_STORAGE_KEY } from '../utils/constants';

// Importamos la función que retorna un token.
import { getToken } from '../utils/getToken';

// Importamos los servicios.
import {
  getPrivateProfileService,
  signInService,
  signUpService,
} from '../services/userService';

//Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

//Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  //Función que retorna los datos del usuario.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const body = await getPrivateProfileService();

        setAuthUser(body.data.user);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    //Obtenemos el token.
    const token = getToken();

    //Si existe token solicitamos los datos del usuario.
    if (token) fetchUser();
  }, [isAuthenticated]);

  //Funcion que registra usuario en la base de datos
  const authRegister = async (username, email, password, repeatedPassword) => {
    try {
      setLoading(true);

      if (password !== repeatedPassword) {
        throw new Error('Las contraseñas deben coincidir');
      }

      const body = await signUpService(username, email, password);

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      //Una vez registrados redirigimos a la página de login.
      navigate('/login');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función que logea a un usuario retornando un token.
  const authLogin = async (email, password) => {
    try {
      setLoading(true);

      const body = await signInService(email, password);

      if (body.status === 'error') {
        throw new Error(body.message);
      }

  // Almacenamos el token en el localStorage. Dado que la variable "token" es un string no es necesario aplicar el JSON.stringify.
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token);

  // Almacenamos el token en el State.
      setIsAuthenticated(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Función de logout.
  const authLogout = () => {
  // Eliminamos el token del localStorage.
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);

  // Eliminamos los datos del usuario y el token del State
  setAuthUser(null);
  setIsAuthenticated(false);
  navigate('/');
  };

  //Función que actualiza perfil de usuario
  // const authUpdate = async (username, email, password, repeatedPassword) => {
  //   try {
  //     setLoading(true);

  //     if (password !== repeatedPassword) {
  //       throw new Error('Las contraseñas deben coincidir');
  //     }

  //     const body = await updateProfileService(username, email, password);

  //     if (body.status === 'error') {
  //       throw new Error(body.message);
  //     }

  //     // Actualizamos los datos del ususario en el State.
  //     setAuthUser({
  //       ...authUser,
  //       username,
  //       email,
  //     });

  //     navigate('/');
  //   } catch (err) {
  //     setErrMsg(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authRegister,
        authLogin,
        authLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

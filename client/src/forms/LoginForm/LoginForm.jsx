//Importamos los prop-types.
import PropTypes from 'prop-types';

//Importamos los hooks.
import { useState } from 'react';

const LoginForm = ({ authLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        authLogin(email, password);
      }}
    >
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />

      <label htmlFor='pass'>Contraseña:</label>
      <input
        type='password'
        id='pass'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength='8'
        maxLength='100'
        required
      />

      <button disabled={loading}>Iniciar sesión</button>
    </form>
  );
};

LoginForm.propTypes = {
  authLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;

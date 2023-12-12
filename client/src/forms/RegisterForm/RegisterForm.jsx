import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const RegisterForm = ({ authRegister, loading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        authRegister(username, email, password, repeatedPassword);
      }}
    >
      <label htmlFor='username'><b>Nombre de usuario:</b></label>
      <input
        type='text'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        required
      />
      <label htmlFor='email'><b>Email:</b></label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor='pass'><b>Contraseña:</b></label>
      <input
        type='password'
        id='pass'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength='8'
        maxLength='100'
        required
      />
      <label htmlFor='repeatedPass'>
        <b>Confirmar contraseña:</b>
      </label>
      <input
        type='password'
        id='repeatedPass'
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        minLength='8'
        maxLength='100'
        required
      />
      <button disabled={loading}>Registrarse</button>
    </form>
  ); 
  
};

RegisterForm.propTypes = {
  authRegister: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterForm;

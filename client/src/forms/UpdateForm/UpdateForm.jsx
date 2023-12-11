import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

const UpdateForm = ({ authUser, authUpdate, loading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
      setEmail(authUser.email);
    }
  }, [authUser]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        authUpdate(username, email, password);
      }}
    >
      <label htmlFor='username'>Nombre de usuario:</label>
      <input
        type='text'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        required
      />
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <button disabled={loading}>Actualizar</button>
    </form>
  );
};

UpdateForm.propTypes = {
  authUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default UpdateForm;

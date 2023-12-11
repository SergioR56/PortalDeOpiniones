//Importamos los prop-types.
import PropTypes from 'prop-types';

//Importamos los hooks.
import { useEffect } from 'react';

//Importamos los estilos.
import './ErrorMessage.css';

const ErrorMessage = ({ errMsg, setErrMsg }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrMsg('');
    }, 4000);
  }, [errMsg, setErrMsg]);

  return (
    errMsg && (
      <div className='error-message'>
        {console.warn(errMsg)}
        <p>⚠️ {errMsg}</p>
      </div>
    )
  );
};

ErrorMessage.propTypes = {
  errMsg: PropTypes.string.isRequired,
  setErrMsg: PropTypes.func.isRequired,
};

export default ErrorMessage;

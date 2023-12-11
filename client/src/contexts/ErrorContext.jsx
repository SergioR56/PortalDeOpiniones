//Importamos la biblioteca prop-types para especificar el tipo de las props.
import PropTypes from 'prop-types';

//Importamos la función que crea un contexto y los hooks.
import { createContext, useState } from 'react';

//Creamos el contexto de autenticación.
export const ErrorContext = createContext(null);

//Creamos el componente proveedor de contexto.
export const ErrorProvider = ({ children }) => {
    const [errMsg, setErrMsg] = useState('');

    return (
        <ErrorContext.Provider value={{ errMsg, setErrMsg }}>
            {children}
        </ErrorContext.Provider>
    );
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

//Importamos los hooks.
import { useContext } from 'react';

//Importamos el contexto.
import { ErrorContext } from '../contexts/ErrorContext';

export const useError = () => {
    return useContext(ErrorContext);
};

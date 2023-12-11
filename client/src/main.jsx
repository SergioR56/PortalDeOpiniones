//Importamos las dependencias.
import React from 'react';
import ReactDOM from 'react-dom/client';

//Importamos los componentes
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ErrorProvider } from './contexts/ErrorContext.jsx';

//Importamos los estilos
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
);

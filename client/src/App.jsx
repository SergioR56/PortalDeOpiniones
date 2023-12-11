//Importamos los hooks.
import { useError } from './hooks/useError';

//Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

//Importamos las páginas.
import PostSearchPage from './pages/PostSearchPage/PostSearchPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UpdatePage from './pages/UpdatePage/UpdatePage';
import PostCreatePage from './pages/PostCreatePage/PostCreatePage';

const App = () => {
  const { errMsg, setErrMsg } = useError();

  return (
    <div className='app'>
      <Header />
      <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />
      <Routes>
        <Route path='/' element={<PostSearchPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/update' element={<UpdatePage />} />
        <Route path='/message' element={<PostCreatePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

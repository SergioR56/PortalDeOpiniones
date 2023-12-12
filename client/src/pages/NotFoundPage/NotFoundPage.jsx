import { NavLink } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <main>
      <h2>Pagina no encontrada - 404 </h2>
      <li>
        Si te perdiste vuelve al principio,<br></br>
        <NavLink to='/'>Volver</NavLink>
      </li>
    </main>
  );
};

export default NotFoundPage;

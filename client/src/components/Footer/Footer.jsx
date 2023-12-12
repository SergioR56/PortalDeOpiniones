import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p className='xer'>
        <NavLink to='https://www.hackaboss.com/' target='_blank'>
          &copy; HACKABOSS 2023
        </NavLink>
      </p>
    </footer>
  );
};
export default Footer;

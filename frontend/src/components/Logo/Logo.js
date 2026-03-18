import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to='/home' className='logo'>
      <img src={logo} alt='Drink Master' className='logo-icon' />
      <span className='logo-text'>Drink Master</span>
    </Link>
  );
};

export default Logo;

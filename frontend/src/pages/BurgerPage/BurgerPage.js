import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggler from '../../components/ThemeToggler/ThemeToggler';
import logo from '../../assets/logo.png';
import './BurgerPage.css';

const BurgerPage = () => {
  const navigate = useNavigate();

  const closeMenu = () => {
    navigate(-1);
  };

  return (
    <div className='burger-page'>
      <div className='burger-header'>
        <div className='burger-logo'>
          <img src={logo} alt='logo' />
          <span>Drink Master</span>
        </div>

        <div className='burger-header-right'>
          <ThemeToggler />
          <button className='burger-close' onClick={closeMenu}>
            ✕
          </button>
        </div>
      </div>

      <nav className='burger-nav'>
        <NavLink to='/home' className='burger-btn-link'>
          Home
        </NavLink>
        <NavLink to='/drinks' className='burger-btn-link'>
          Drinks
        </NavLink>
        <NavLink to='/add' className='burger-btn-link'>
          Add drink
        </NavLink>
        <NavLink to='/my' className='burger-btn-link'>
          My drinks
        </NavLink>
        <NavLink to='/favorites' className='burger-btn-link'>
          Favorites
        </NavLink>
      </nav>
    </div>
  );
};

export default BurgerPage;

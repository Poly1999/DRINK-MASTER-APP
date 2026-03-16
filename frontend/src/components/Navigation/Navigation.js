import { NavLink } from 'react-router-dom';
import './Navigation.css';
import '../../pages/AuthPages.css';

const Navigation = () => {
  return (
    <nav className='nav'>
      <NavLink
        to='/home'
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Home
      </NavLink>

      <NavLink
        to='/drinks'
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Drinks
      </NavLink>

      <NavLink
        to='/add'
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Add drink
      </NavLink>

      <NavLink
        to='/my'
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        My drinks
      </NavLink>

      <NavLink
        to='/favorites'
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Favorite
      </NavLink>
    </nav>
  );
};

export default Navigation;

import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import avatar from '../../assets/avatar.png';
import './Header.css';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

const Header = () => {
  const user = useSelector(state => state.auth?.user);
  return (
    <header className='header'>
      <div className='header-container'>
        <Logo />
        <Navigation />
        <div className='header-right'>
          <ThemeToggler />
          <div className='user-logo'>
            <img
              src={user?.avatar || avatar}
              alt={user?.name}
              className='user-avatar'
            />
            <span className='user-name'>{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

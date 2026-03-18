import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import UserLogoPopup from '../UserLogoPopup/UserLogoPopup';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import { logout } from '../../redux/authSlice';
import avatar from '../../assets/avatar.png';
import './Header.css';

const Header = () => {
  const user = useSelector(state => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem('token');
    navigate('/welcome');
    setIsPopupOpen(false);
  };

  return (
    <header className='header'>
      <div className='header-container'>
        <Logo />
        <Navigation />
        <div className='header-right'>
          <ThemeToggler />
          <div className='user-logo' onClick={() => setIsPopupOpen(true)}>
            <img
              src={user?.avatar || avatar}
              alt={user?.name}
              className='user-avatar'
            />
            <span className='user-name'>{user?.name}</span>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <UserLogoPopup
          onClose={() => setIsPopupOpen(false)}
          onEditProfile={() => {
            setIsPopupOpen(false);
            setIsModalOpen(true);
          }}
          onLogout={handleLogout}
        />
      )}

      {isModalOpen && <UserInfoModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;

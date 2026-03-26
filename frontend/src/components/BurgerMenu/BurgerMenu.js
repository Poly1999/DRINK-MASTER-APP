import { useNavigate } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const navigate = useNavigate();

  const openMenu = () => {
    navigate('/menu');
  };

  return (
    <button
      type='button'
      className='burger-btn'
      onClick={openMenu}
      aria-label='Open menu'
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default BurgerMenu;

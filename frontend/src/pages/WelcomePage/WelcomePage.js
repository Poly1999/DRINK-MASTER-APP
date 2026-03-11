import { Link } from 'react-router-dom';
import '../AuthPages.css';
import startPageImg from '../../assets/startPageImg.png';
import ellipce from '../../assets/ellipce.png';

const WelcomePage = () => {
  return (
    <div className='auth-page'>
      <img src={ellipce} alt='' className='ellipce' />
      <div className='auth-image'>
        <img src={startPageImg} alt='cocktail' />
      </div>

      <div className='auth-content'>
        <h1 className='auth-title'>Welcome to the app!</h1>
        <p className='welcome-text'>
          This app offers more than just a collection of recipes - it is
          designed to be your very own digital cookbook. You can easily save and
          retrieve your own recipes at any time.
        </p>
        <div className='welcome-buttons'>
          <Link to='/signup' className='btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn-secondary'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

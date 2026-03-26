import { Link } from 'react-router-dom';
import '../AuthPages.css';
import './WelcomePage.css';
import startPageImg from '../../assets/startPageImg.png';
import ellipse from '../../assets/ellipse.png';

const WelcomePage = () => {
  return (
    <div className='auth-page'>
      <img src={ellipse} alt='' className='ellipse' />
      <div className='auth-image'>
        <img src={startPageImg} alt='cocktail' />
      </div>

      <div className='welcome-container'>
        <div className='welcome-content'>
          <h1 className='welcome-title'>Welcome to the app!</h1>
          <p className='welcome-text'>
            This app offers more than just a collection of recipes - it is
            designed to be your very own digital cookbook. You can easily save
            and retrieve your own recipes at any time.
          </p>
        </div>

        <div className='welcome-buttons'>
          <Link to='/signup' className='signup-button'>
            Sign Up
          </Link>
          <Link to='/login' className='signin-button'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

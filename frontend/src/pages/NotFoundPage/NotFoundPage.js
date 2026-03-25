import { Link } from 'react-router-dom';
import cocktailHero from '../../assets/cocktail-hero.png';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <div className='not-found-numbers'>
        <span className='not-found-number'>4</span>
        <img src={cocktailHero} alt='cocktail' className='not-found-img' />
        <span className='not-found-number'>4</span>
      </div>
      <Link to='/home' className='not-found-btn'>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

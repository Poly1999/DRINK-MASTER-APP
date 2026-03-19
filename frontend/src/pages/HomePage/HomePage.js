import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMainPage } from '../../redux/drinksSlice';
import cocktailHero from '../../assets/cocktail-hero.png';
import ellipseBefore from '../../assets/elipse-hero-before.png';
import ellipseAfterYellow from '../../assets/ellipse-hero-after-yellow.png';
import ellipseAfterBlue from '../../assets/ellipse-hero-after-blue.png';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { mainPageDrinks } = useSelector(state => state.drinks);

  useEffect(() => {
    dispatch(getMainPage());
  }, [dispatch]);
  return (
    <div className='home-page'>
      {/* Hero section */}
      <section className='hero'>
        <img
          src={ellipseBefore}
          alt='ellipse-hero-before'
          className='ellipse-hero-before'
        />
        <div className='hero-content'>
          <h1 className='hero-title'>
            Craft Your Perfect Drink with Drink Master
          </h1>
          <p className='hero-text'>
            Unlock your inner mixologist with Drink Master, your one-stop
            destination for exploring, crafting, and mastering the world's
            finest beverages.
          </p>
          <Link to='/add' className='hero-btn'>
            Add drink
          </Link>
        </div>
        <div className='hero-image'>
          <img src={cocktailHero} alt='cocktail' />
        </div>
      </section>

      {/* Preview Drinks */}
      <section className='preview-drinks'>
        {mainPageDrinks?.map(({ category, drinks }) => (
          <div key={category} className='preview-category'>
            <h2 className='preview-category-title'>{category}</h2>
            <div className='preview-drinks-list'>
              {drinks?.map(drink => (
                <div key={drink._id} className='preview-drink-card'>
                  <img
                    src={drink.drinkThumb}
                    alt={drink.drink}
                    className='preview-drink-img'
                  />
                  <div className='preview-drink-info'>
                    <span className='preview-drink-name'>{drink.drink}</span>
                    <Link
                      to={`/drink/${drink._id}`}
                      className='preview-drink-link'
                    >
                      See more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Кнопка Other drinks */}
        <div className='other-drinks-btn-wrapper'>
          <Link to='/drinks' className='other-drinks-btn'>
            Other drinks
          </Link>
        </div>
        <img
          src={ellipseAfterYellow}
          alt='ellipse-after-yellow'
          className='ellipse-after-yellow'
        />
        <img
          src={ellipseAfterBlue}
          alt='ellipse-after-blue'
          className='ellipse-after-blue'
        />
      </section>
    </div>
  );
};

export default HomePage;

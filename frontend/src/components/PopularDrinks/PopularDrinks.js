import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPopular } from '../../redux/drinksSlice';
import './PopularDrinks.css';

const PopularDrinks = () => {
  const dispatch = useDispatch();
  const { popularDrinks } = useSelector(state => state.drinks);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  return (
    <div className='popular-drinks'>
      <h3 className='popular-drinks-title'>Popular drinks</h3>
      <ul className='popular-drinks-list'>
        {popularDrinks?.map(drink => (
          <li key={drink._id} className='popular-drink-item'>
            <Link to={`/drink/${drink._id}`} className='popular-drink-link'>
              <img
                src={drink.drinkThumb}
                alt={drink.drink}
                className='popular-drink-img'
              />
              <div className='popular-drink-info'>
                <h4 className='popular-drink-name'>{drink.drink}</h4>
                <p className='popular-drink-description'>{drink.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularDrinks;

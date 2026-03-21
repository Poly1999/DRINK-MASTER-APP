import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/drinksSlice';
import toast from 'react-hot-toast';
import './CocktailPageHero.css';

const CocktailPageHero = ({ drink }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);
  const isFavorite = user?.favorites?.includes(drink._id);

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      const result = await dispatch(removeFavorite(drink._id));
      if (removeFavorite.fulfilled.match(result)) {
        toast.success('Removed from favorites');
      }
    } else {
      const result = await dispatch(addFavorite(drink._id));
      if (addFavorite.fulfilled.match(result)) {
        toast.success('Added to favorites');
      }
    }
  };

  return (
    <section className='cocktail-hero'>
      <div className='cocktail-hero-content'>
        <h1 className='cocktail-hero-title'>{drink.drink}</h1>
        <p className='cocktail-hero-meta'>
          {drink.glass} / {drink.alcoholic}
        </p>
        <p className='cocktail-hero-description'>{drink.description}</p>
        <button className='cocktail-hero-btn' onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorite drinks'}
        </button>
      </div>

      <div className='cocktail-hero-image'>
        <img src={drink.drinkThumb} alt={drink.drink} />
      </div>
    </section>
  );
};

export default CocktailPageHero;

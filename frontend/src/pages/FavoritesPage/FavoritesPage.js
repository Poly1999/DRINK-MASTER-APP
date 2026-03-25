import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getFavorites, removeFavorite } from '../../redux/drinksSlice';
import DrinksList from '../../components/DrinksList/DrinksList';
import Paginator from '../../components/Paginator/Paginator';
import './FavoritesPage.css';
import ellipseBefore from '../../assets/elipse-hero-before.png';
import ellipseAfterBlue from '../../assets/ellipse-hero-after-blue.png';
import cocktailHero from '../../assets/cocktail-hero.png';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoriteDrinks, totalPages, currentPage, isLoading } = useSelector(
    state => state.drinks,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getFavorites({ page }));
  }, [dispatch, page]);

  const handleDelete = async id => {
    const result = await dispatch(removeFavorite(id));
    if (removeFavorite.fulfilled.match(result)) {
      toast.success('Removed from favorites!');
    } else {
      toast.error('Something went wrong');
    }
  };

  const handlePageChange = page => {
    setSearchParams({ page });
  };

  return (
    <div className='favorites-page'>
      <img
        src={ellipseBefore}
        alt='ellipse-hero-before'
        className='ellipse-hero-before'
      />
      <h1 className='favorites-title'>Favorites</h1>

      {!isLoading && favoriteDrinks.length === 0 && (
        <div className='favorites-empty'>
          <img
            src={cocktailHero}
            alt='no favorites'
            className='favorites-empty-img'
          />
          <p className='favorites-empty-text'>
            You haven't added any favorite cocktails yet
          </p>
        </div>
      )}

      {!isLoading && favoriteDrinks.length > 0 && (
        <DrinksList drinks={favoriteDrinks} onDelete={handleDelete} />
      )}

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <img
        src={ellipseAfterBlue}
        alt='ellipse-after-blue'
        className='ellipse-after-blue'
      />
    </div>
  );
};

export default FavoritesPage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getFavorites, removeFavorite } from '../../redux/drinksSlice';
import DrinksList from '../../components/DrinksList/DrinksList';
import Paginator from '../../components/Paginator/Paginator';
import './FavoritesPage.css';

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
      <h1 className='favorites-title'>Favorites</h1>

      {isLoading && <p className='favorites-loading'>Loading...</p>}

      {!isLoading && (
        <DrinksList drinks={favoriteDrinks} onDelete={handleDelete} />
      )}

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FavoritesPage;

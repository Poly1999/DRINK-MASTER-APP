import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getOwnDrinks, removeOwnDrink } from '../../redux/drinksSlice';
import DrinksList from '../../components/DrinksList/DrinksList';
import Paginator from '../../components/Paginator/Paginator';
import './MyDrinksPage.css';

const MyDrinksPage = () => {
  const dispatch = useDispatch();
  const { ownDrinks, totalPages, currentPage, isLoading } = useSelector(
    state => state.drinks,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getOwnDrinks({ page }));
  }, [dispatch, page]);

  const handleDelete = async id => {
    const result = await dispatch(removeOwnDrink(id));
    if (removeOwnDrink.fulfilled.match(result)) {
      toast.success('Drink deleted!');
    } else {
      toast.error('Something went wrong');
    }
  };

  const handlePageChange = page => {
    setSearchParams({ page });
  };

  return (
    <div className='my-drinks-page'>
      <h1 className='my-drinks-title'>My drinks</h1>

      {isLoading && <p className='my-drinks-loading'>Loading...</p>}

      {!isLoading && <DrinksList drinks={ownDrinks} onDelete={handleDelete} />}

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MyDrinksPage;

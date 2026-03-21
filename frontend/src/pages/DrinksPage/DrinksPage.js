import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchDrinks } from '../../redux/drinksSlice';
import DrinksSearch from '../../components/DrinksSearch/DrinksSearch';
import DrinkCard from '../../components/DrinkCard/DrinkCard';
import Paginator from '../../components/Paginator/Paginator';
import './DrinksPage.css';
import ellipseBefore from '../../assets/elipse-hero-before.png';
import ellipseAfterBlue from '../../assets/ellipse-hero-after-blue.png';

const DrinksPage = () => {
  const dispatch = useDispatch();
  const { drinks, totalPages, currentPage, isLoading } = useSelector(
    state => state.drinks,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    ingredient: searchParams.get('ingredient') || '',
    page: Number(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    dispatch(searchDrinks(filters));
  }, [dispatch, filters]);

  const handleSearch = newFilters => {
    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  const handlePageChange = page => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  return (
    <div className='drinks-page'>
      <img
        src={ellipseBefore}
        alt='ellipse-hero-before'
        className='ellipse-hero-before'
      />
      <h1 className='drinks-page-title'>Drinks</h1>

      <DrinksSearch onSearch={handleSearch} />

      {isLoading && <p className='drinks-loading'>Loading...</p>}

      {!isLoading && drinks.length > 0 && (
        <div className='drinks-grid'>
          {drinks.map(drink => (
            <DrinkCard key={drink._id} drink={drink} />
          ))}
        </div>
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

export default DrinksPage;

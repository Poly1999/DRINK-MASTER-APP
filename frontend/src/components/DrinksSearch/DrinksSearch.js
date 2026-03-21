import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getIngredients } from '../../redux/drinksSlice';
import { useEffect } from 'react';
import search from '../../assets/search.png';
import chevronDown from '../../assets/chevron-down.png';
import './DrinksSearch.css';

const DrinksSearch = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { categories, ingredients } = useSelector(state => state.drinks);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const handleSearch = e => {
    e.preventDefault();
    onSearch({ keyword, category, ingredient, page: 1 });
  };

  const handleCategorySelect = cat => {
    setCategory(cat);
    setIsCategoryOpen(false);
    onSearch({ keyword, category: cat, ingredient, page: 1 });
  };

  const handleIngredientSelect = ing => {
    setIngredient(ing);
    setIsIngredientOpen(false);
    onSearch({ keyword, category, ingredient: ing, page: 1 });
  };

  return (
    <div className='drinks-search'>
      <form className='search-form' onSubmit={handleSearch}>
        <input
          className='search-input'
          placeholder='Enter the text'
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button type='submit' className='search-btn'>
          <img src={search} alt='search' />
        </button>
      </form>

      <div className='select-wrapper'>
        <button
          className={`select-btn ${isCategoryOpen ? 'open' : ''}`}
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen);
            setIsIngredientOpen(false);
          }}
        >
          {category || 'All categories'}
          <img
            src={chevronDown}
            alt='chevron'
            className={`chevron ${isCategoryOpen ? 'chevron-up' : ''}`}
          />
        </button>
        {isCategoryOpen && (
          <ul className='select-dropdown'>
            <li onClick={() => handleCategorySelect('')}>All categories</li>
            {categories.map(cat => (
              <li
                key={cat}
                className={category === cat ? 'selected' : ''}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='select-wrapper'>
        <button
          className={`select-btn ${isIngredientOpen ? 'open' : ''}`}
          onClick={() => {
            setIsIngredientOpen(!isIngredientOpen);
            setIsCategoryOpen(false);
          }}
        >
          {ingredient || 'Ingredients'}
          <img
            src={chevronDown}
            alt='chevron'
            className={`chevron ${isIngredientOpen ? 'chevron-up' : ''}`}
          />
        </button>
        {isIngredientOpen && (
          <ul className='select-dropdown'>
            <li onClick={() => handleIngredientSelect('')}>All ingredients</li>
            {ingredients.map(ing => (
              <li
                key={ing._id}
                onClick={() => handleIngredientSelect(ing.title)}
              >
                {ing.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DrinksSearch;

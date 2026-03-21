import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDrinkById } from '../../redux/drinksSlice';
import CocktailPageHero from '../../components/CocktailPageHero/CocktailPageHero';
import CocktailIngredientsList from '../../components/CocktailIngredientsList/CocktailIngredientsList';
import CocktailRecipe from '../../components/CocktailRecipe/CocktailRecipe';
import './CocktailPage.css';

const CocktailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentDrink, isLoading } = useSelector(state => state.drinks);

  console.log('isLoading:', isLoading);
  console.log('currentDrink:', currentDrink);

  useEffect(() => {
    dispatch(getDrinkById(id));
  }, [dispatch, id]);

  if (isLoading) return <div className='cocktail-loading'>Loading...</div>;
  if (!currentDrink) return null;

  return (
    <div className='cocktail-page'>
      <CocktailPageHero drink={currentDrink} />
      <CocktailIngredientsList ingredients={currentDrink.ingredients} />
      <CocktailRecipe
        instructions={currentDrink.instructions}
        description={currentDrink.description}
      />
    </div>
  );
};

export default CocktailPage;

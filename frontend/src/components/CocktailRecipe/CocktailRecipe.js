import './CocktailRecipe.css';
import recipeImg from '../../assets/recipe-prep.png';

const CocktailRecipe = ({ instructions, description }) => {
  return (
    <section className='cocktail-recipe'>
      <h2 className='cocktail-recipe-title'>Recipe Preparation</h2>
      <div className='cocktail-recipe-content'>
        <div className='cocktail-recipe-image'>
          <img src={recipeImg} alt='cocktail recipe' />
        </div>
        <div className='cocktail-recipe-text'>
          <p className='cocktail-recipe-description'>{description}</p>
          <p className='cocktail-recipe-instructions'>{instructions}</p>
        </div>
      </div>
    </section>
  );
};

export default CocktailRecipe;

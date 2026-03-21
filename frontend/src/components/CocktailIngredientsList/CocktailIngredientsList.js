import './CocktailIngredientsList.css';

const CocktailIngredientsList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <section className='cocktail-ingredients'>
      <h2 className='cocktail-ingredients-title'>Ingredients</h2>
      <ul className='cocktail-ingredients-list'>
        {ingredients.map((ingredient, index) => (
          <li key={index} className='cocktail-ingredient-item'>
            <div className='cocktail-ingredient-img-wrapper'>
              <img
                src={`https://ftp.goit.study/img/drinkify/ingredients/${ingredient.title}.png`}
                alt={ingredient.title}
                className='cocktail-ingredient-img'
                onError={e => {
                  e.target.src =
                    'https://placehold.co/160x160/1c2747/f3f3f3?text=No+photo';
                }}
              />
            </div>
            <p className='cocktail-ingredient-name'>{ingredient.title}</p>
            <p className='cocktail-ingredient-measure'>{ingredient.measure}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CocktailIngredientsList;

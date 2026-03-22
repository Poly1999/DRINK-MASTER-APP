import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  addOwnDrink,
  getCategories,
  getIngredients,
} from '../../redux/drinksSlice';
import './AddDrinkForm.css';

const AddDrinkForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, ingredients } = useSelector(state => state.drinks);

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [glass, setGlass] = useState('');
  const [alcoholic, setAlcoholic] = useState('Alcoholic');
  const [recipeIngredients, setRecipeIngredients] = useState([
    { title: '', measure: '' },
  ]);
  const [instructions, setInstructions] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isGlassOpen, setIsGlassOpen] = useState(false);

  const glasses = [
    'Highball glass',
    'Cocktail glass',
    'Old-fashioned glass',
    'Whiskey Glass',
    'Collins glass',
    'Champagne flute',
    'Shot glass',
    'Wine Glass',
    'Martini Glass',
  ];

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  // Вибір фото
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Додати інгредієнт
  const addIngredient = () => {
    setRecipeIngredients([...recipeIngredients, { title: '', measure: '' }]);
  };

  // Видалити інгредієнт
  const removeIngredient = index => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  // Оновити інгредієнт
  const updateIngredient = (index, field, value) => {
    const updated = recipeIngredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing,
    );
    setRecipeIngredients(updated);
  };

  // Відправити форму
  const handleSubmit = async e => {
    e.preventDefault();

    if (!title || !description || !category || !glass || !instructions) {
      toast.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('drink', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('glass', glass);
    formData.append('alcoholic', alcoholic);
    formData.append('instructions', instructions);
    formData.append('ingredients', JSON.stringify(recipeIngredients));
    if (photo) formData.append('drinkThumb', photo);

    const result = await dispatch(addOwnDrink(formData));
    if (addOwnDrink.fulfilled.match(result)) {
      toast.success('Drink added!');
      navigate('/my');
    } else {
      toast.error(result.payload || 'Something went wrong');
    }
  };

  return (
    <form className='add-drink-form' onSubmit={handleSubmit}>
      <div className='add-drink-form-top'>
        {/* Фото */}
        <label className='add-drink-photo'>
          {preview ? (
            <img src={preview} alt='preview' className='add-drink-preview' />
          ) : (
            <div className='add-drink-photo-placeholder'>
              <span className='add-drink-photo-icon'>+</span>
              <span>Add image</span>
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handlePhotoChange}
            hidden
          />
        </label>

        {/* Поля форми */}
        <div className='add-drink-fields'>
          <input
            className='add-drink-input'
            placeholder='Enter item title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            className='add-drink-input'
            placeholder='Enter about recipe'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {/* Категорія */}
          <div className='add-drink-select-row'>
            <span className='add-drink-label'>Category</span>
            <div className='add-drink-select-wrapper'>
              <button
                type='button'
                className='add-drink-select-btn'
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsGlassOpen(false);
                }}
              >
                {category || 'Select category'}
                <span>▼</span>
              </button>
              {isCategoryOpen && (
                <ul className='add-drink-dropdown'>
                  {categories.map(cat => (
                    <li
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Тара */}
          <div className='add-drink-select-row'>
            <span className='add-drink-label'>Glass</span>
            <div className='add-drink-select-wrapper'>
              <button
                type='button'
                className='add-drink-select-btn'
                onClick={() => {
                  setIsGlassOpen(!isGlassOpen);
                  setIsCategoryOpen(false);
                }}
              >
                {glass || 'Select glass'}
                <span>▼</span>
              </button>
              {isGlassOpen && (
                <ul className='add-drink-dropdown'>
                  {glasses.map(g => (
                    <li
                      key={g}
                      onClick={() => {
                        setGlass(g);
                        setIsGlassOpen(false);
                      }}
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Алкогольний */}
          <div className='add-drink-radio-row'>
            <label className='add-drink-radio'>
              <input
                type='radio'
                name='alcoholic'
                value='Alcoholic'
                checked={alcoholic === 'Alcoholic'}
                onChange={e => setAlcoholic(e.target.value)}
              />
              Alcoholic
            </label>
            <label className='add-drink-radio'>
              <input
                type='radio'
                name='alcoholic'
                value='Non alcoholic'
                checked={alcoholic === 'Non alcoholic'}
                onChange={e => setAlcoholic(e.target.value)}
              />
              Non-alcoholic
            </label>
          </div>
        </div>
      </div>

      {/* Інгредієнти */}
      <div className='add-drink-ingredients'>
        <div className='add-drink-ingredients-header'>
          <h3 className='add-drink-ingredients-title'>Ingredients</h3>
          <div className='add-drink-counter'>
            <button
              type='button'
              onClick={() => removeIngredient(recipeIngredients.length - 1)}
            >
              −
            </button>
            <span>{recipeIngredients.length}</span>
            <button type='button' onClick={addIngredient}>
              +
            </button>
          </div>
        </div>

        {recipeIngredients.map((ing, index) => (
          <div key={index} className='add-drink-ingredient-row'>
            <div className='add-drink-ingredient-select'>
              <select
                className='add-drink-ingredient-input'
                value={ing.title}
                onChange={e => updateIngredient(index, 'title', e.target.value)}
              >
                <option value=''>Select ingredient</option>
                {ingredients.map(i => (
                  <option key={i._id} value={i.title}>
                    {i.title}
                  </option>
                ))}
              </select>
            </div>
            <input
              className='add-drink-measure-input'
              placeholder='1 cl'
              value={ing.measure}
              onChange={e => updateIngredient(index, 'measure', e.target.value)}
            />
            <button
              type='button'
              className='add-drink-remove-btn'
              onClick={() => removeIngredient(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Recipe Preparation */}
      <div className='add-drink-recipe'>
        <h3 className='add-drink-recipe-title'>Recipe Preparation</h3>
        <textarea
          className='add-drink-textarea'
          placeholder='Enter the recipe'
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />
      </div>

      <button type='submit' className='add-drink-submit'>
        Add
      </button>
    </form>
  );
};

export default AddDrinkForm;

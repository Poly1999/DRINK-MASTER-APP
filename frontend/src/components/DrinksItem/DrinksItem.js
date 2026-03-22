import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete-icon.png';
import './DrinksItem.css';

const DrinksItem = ({ drink, onDelete }) => {
  return (
    <div className='drinks-item'>
      <img
        src={drink.drinkThumb}
        alt={drink.drink}
        className='drinks-item-img'
      />
      <div className='drinks-item-info'>
        <h3 className='drinks-item-name'>{drink.drink}</h3>
        <p className='drinks-item-alcoholic'>{drink.alcoholic}</p>
        <p className='drinks-item-description'>{drink.description}</p>
        <div className='drinks-item-actions'>
          <Link to={`/drink/${drink._id}`} className='drinks-item-btn'>
            See more
          </Link>
          <button
            className='drinks-item-delete'
            onClick={() => onDelete(drink._id)}
          >
            <img src={deleteIcon} alt='delete' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinksItem;

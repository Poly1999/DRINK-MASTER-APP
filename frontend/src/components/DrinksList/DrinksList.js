import DrinksItem from '../DrinksItem/DrinksItem';
import './DrinksList.css';

const DrinksList = ({ drinks, onDelete }) => {
  if (!drinks || drinks.length === 0) {
    return <p className='drinks-list-empty'>No drinks found</p>;
  }

  return (
    <ul className='drinks-list'>
      {drinks.map(drink => (
        <li key={drink._id}>
          <DrinksItem drink={drink} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default DrinksList;

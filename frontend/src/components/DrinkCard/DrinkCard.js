// import { Link } from 'react-router-dom';
// import './DrinkCard.css';

// const DrinkCard = ({ drink }) => {
//   return (
//     <div className='drink-card'>
//       {/* <img
//         src={drink.drinkThumb}
//         alt={drink.drink}
//         className='drink-card-img'
//       /> */}
//       <img
//         src={
//           drink.drinkThumb.startsWith('http')
//             ? drink.drinkThumb
//             : `http://localhost:8000/uploads/${drink.drinkThumb}`
//         }
//         alt={drink.drink}
//         className='drink-card-img'
//       />
//       <div className='drink-card-info'>
//         <span className='drink-card-name'>{drink.drink}</span>
//         <Link to={`/drink/${drink._id}`} className='drink-card-link'>
//           See more
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DrinkCard;

import { Link } from 'react-router-dom';
import './DrinkCard.css';

const DrinkCard = ({ drink }) => {
  const imageSrc = drink.drinkThumb
    ? drink.drinkThumb.startsWith('http')
      ? drink.drinkThumb
      : `http://localhost:8000/uploads/${drink.drinkThumb}`
    : '/placeholder.png'; // картинка “немає фото”

  return (
    <div className='drink-card'>
      <img src={imageSrc} alt={drink.drink} className='drink-card-img' />
      <div className='drink-card-info'>
        <span className='drink-card-name'>{drink.drink}</span>
        <Link to={`/drink/${drink._id}`} className='drink-card-link'>
          See more
        </Link>
      </div>
    </div>
  );
};

export default DrinkCard;

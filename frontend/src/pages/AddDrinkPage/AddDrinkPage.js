import AddDrinkForm from '../../components/AddDrinkForm/AddDrinkForm';
import PopularDrinks from '../../components/PopularDrinks/PopularDrinks';
import FollowUs from '../../components/FollowUs/FollowUs';
import './AddDrinkPage.css';
import ellipseBefore from '../../assets/elipse-hero-before.png';
import ellipseAfterBlue from '../../assets/ellipse-hero-after-blue.png';

const AddDrinkPage = () => {
  return (
    <div className='add-drink-page'>
      <img
        src={ellipseBefore}
        alt='ellipse-hero-before'
        className='ellipse-hero-before'
      />
      <h1 className='add-drink-page-title'>Add drink</h1>
      <div className='add-drink-page-content'>
        <AddDrinkForm />
        <div className='add-drink-page-sidebar'>
          <FollowUs />
          <PopularDrinks />
        </div>
      </div>
      <img
        src={ellipseAfterBlue}
        alt='ellipse-after-blue'
        className='ellipse-after-blue'
      />
    </div>
  );
};

export default AddDrinkPage;

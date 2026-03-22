import AddDrinkForm from '../../components/AddDrinkForm/AddDrinkForm';
import PopularDrinks from '../../components/PopularDrinks/PopularDrinks';
import FollowUs from '../../components/FollowUs/FollowUs';
import './AddDrinkPage.css';

const AddDrinkPage = () => {
  return (
    <div className='add-drink-page'>
      <h1 className='add-drink-page-title'>Add drink</h1>
      <div className='add-drink-page-content'>
        <AddDrinkForm />
        <div className='add-drink-page-sidebar'>
          <FollowUs />
          <PopularDrinks />
        </div>
      </div>
    </div>
  );
};

export default AddDrinkPage;

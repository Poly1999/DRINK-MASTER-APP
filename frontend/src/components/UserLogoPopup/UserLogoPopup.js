import editPen from '../../assets/edit-pen.svg';
import './UserLogoPopup.css';

const UserLogoPopup = ({ onEditProfile, onLogout, onClose }) => {
  return (
    <div className='popup-overlay' onClick={onClose}>
      <div className='popup' onClick={e => e.stopPropagation()}>
        <button className='popup-item' onClick={onEditProfile}>
          Edit profile
          <img src={editPen} alt='edit' className='popup-icon' />
        </button>
        <button className='popup-logout' onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserLogoPopup;

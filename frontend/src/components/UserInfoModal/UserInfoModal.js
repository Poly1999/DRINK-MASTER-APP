import './UserInfoModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import toast from 'react-hot-toast';
import avatar from '../../assets/avatar.png';
import editPen from '../../assets/edit-pen.svg';
import close from '../../assets/close.png';

const UserInfoModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);

  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || avatar);

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (photo) formData.append('avatar', photo);

    const result = await dispatch(updateUser(formData));
    if (updateUser.fulfilled.match(result)) {
      toast.success('Profile updated!');
      onClose();
    } else {
      toast.error('Something went wrong');
    }
  };
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal' onClick={e => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          <img src={close} alt='close' />
        </button>

        {/* Profile photo */}
        <div className='modal-avatar-wrapper'>
          <img src={preview} alt='avatar' className='modal-avatar' />
          <label className='modal-avatar-btn'>
            <span>+</span>
            <input
              type='file'
              accept='image/*'
              onChange={handlePhotoChange}
              hidden
            />
          </label>
        </div>

        {/* Form */}
        <form className='modal-form' onSubmit={handleSubmit}>
          <div className='modal-input-wrapper'>
            <input
              className='modal-input'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Name'
            />
            <img src={editPen} alt='edit' className='modal-input-icon' />
          </div>
          <button type='submit' className='modal-submit'>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoModal;

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { signup } from '../../redux/authSlice';
import '../AuthPages.css';
import './SignupPage.css';
import startPageImg from '../../assets/startPageImg.png';
import ellipse from '../../assets/ellipse.png';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  birthday: yup
    .date()
    .required('Birthday is required')
    .typeError('Invalid date'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const result = await dispatch(signup(data));
    if (signup.fulfilled.match(result)) {
      toast.success('Registration successful');
      navigate('/home');
    } else {
      toast.error(result.payload || 'Something went wrong');
    }
  };

  return (
    <div className='auth-page'>
      <Toaster />
      <img src={ellipse} alt='' className='ellipse' />

      <div className='auth-image'>
        <img src={startPageImg} alt='cocktail' />
      </div>

      <div className='signup-content'>
        <h1 className='signup-title'>Sign Up</h1>

        <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='signup-form-container'>
            <div>
              <input
                {...register('name')}
                className='signup-input'
                placeholder='John Smith'
              />
              {errors.name && (
                <p className='auth-error'>{errors.name.message}</p>
              )}
            </div>

            <div>
              <Controller
                name='birthday'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat='dd/MM/yyyy'
                    placeholderText='dd/mm/yyyy'
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                    className='signup-input'
                    wrapperClassName='datepicker-wrapper'
                    popperPlacement='right-start'
                    showPopperArrow={false}
                    showIcon
                  />
                )}
              />
              {errors.birthday && (
                <p className='auth-error'>{errors.birthday.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                className='signup-input'
                type='email'
                placeholder='example@gmail.com'
              />
              {errors.email && (
                <p className='auth-error'>{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('password')}
                className='signup-input'
                type='password'
                placeholder='Password'
              />
              {errors.password && (
                <p className='auth-error'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='signup-page-button'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <Link to='/login' className='signin-page-button'>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;

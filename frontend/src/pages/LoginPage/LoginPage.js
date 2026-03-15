import './LoginPage.css';
import '../AuthPages.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../../redux/authSlice';
import startPageImg from '../../assets/startPageImg.png';
import ellipse from '../../assets/ellipse.png';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!');
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
        <img src={startPageImg} alt='coctail' />
      </div>

      <div className='login-content'>
        <h1 className='login-title'>Sign In</h1>

        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='login-form-container'>
            <div>
              <input
                {...register('email')}
                className='login-input'
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
                className='login-input'
                type='password'
                placeholder='Password'
              />
              {errors.password && (
                <p className='auth-error'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <button type='submit' className='login-button' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <Link to='/signup' className='signup-link'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

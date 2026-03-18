import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn, isRefreshing } = useSelector(state => state.auth);

  if (isRefreshing) return null;

  return isLoggedIn ? <Component /> : <Navigate to='/welcome' replace />;
};

export default PrivateRoute;

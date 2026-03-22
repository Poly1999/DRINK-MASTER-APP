import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn, isRefreshing } = useSelector(state => state.auth);
  const location = useLocation();

  if (isRefreshing) return null;

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to='/welcome' state={{ from: location }} replace />
  );
};

export default PrivateRoute;

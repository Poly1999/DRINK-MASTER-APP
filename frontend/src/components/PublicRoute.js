import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to='/home' replace />;
  }

  return <Component />;
};

export default PublicRoute;

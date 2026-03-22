import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/authSlice';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import CocktailPage from './pages/CocktailPage/CocktailPage';
import AddDrinkPage from './pages/AddDrinkPage/AddDrinkPage';
import MyDrinksPage from './pages/MyDrinksPage/MyDrinksPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES  */}
        <Route
          path='/welcome'
          element={<PublicRoute component={WelcomePage} />}
        />
        <Route
          path='/signup'
          element={<PublicRoute component={SignupPage} />}
        />
        <Route path='/login' element={<PublicRoute component={LoginPage} />} />

        {/* PRIVATE ROUTES  */}
        <Route path='/' element={<PrivateRoute component={SharedLayout} />}>
          <Route path='home' element={<HomePage />} />
          <Route path='drinks' element={<DrinksPage />} />
          <Route path='add' element={<AddDrinkPage />} />
          <Route path='my' element={<MyDrinksPage />} />
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='drink/:id' element={<CocktailPage />} />
        </Route>

        {/* REDIRECT  */}
        <Route path='*' element={<Navigate to='/welcome' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

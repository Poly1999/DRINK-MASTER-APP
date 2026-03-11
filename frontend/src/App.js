import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES  */}
        <Route
          path='/welcome'
          element={<PublicRoute component={() => <div>Welcome</div>} />}
        />
        <Route
          path='/signup'
          element={<PublicRoute component={() => <div>Signup</div>} />}
        />
        <Route
          path='/signin'
          element={<PublicRoute component={() => <div>Signin</div>} />}
        />

        {/* PRIVATE ROUTES  */}
        <Route
          path='/home'
          element={<PrivateRoute component={() => <div>Home</div>} />}
        />
        <Route
          path='/drinks'
          element={<PrivateRoute component={() => <div>Drinks</div>} />}
        />
        <Route
          path='/add'
          element={<PrivateRoute component={() => <div>Add Drink</div>} />}
        />
        <Route
          path='/my'
          element={<PrivateRoute component={() => <div>My Drinks</div>} />}
        />
        <Route
          path='/favorites'
          element={<PrivateRoute component={() => <div>Favorites</div>} />}
        />
        <Route
          path='/drink/:id'
          element={<PrivateRoute component={() => <div>Drink Page</div>} />}
        />

        {/* REDIRECT  */}
        <Route path='*' element={<Navigate to='/welcome' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

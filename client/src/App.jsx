import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Auth } from './pages/Auth.jsx';
import { useEffect } from 'react';
import { getCurrentUser } from './services/api.js';
import { useDispatch, useSelector } from 'react-redux';

export const serverUrl = 'http://localhost:5000';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  console.log(userData);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </>
  );
}

export default App;

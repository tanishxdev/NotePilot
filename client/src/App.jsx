import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Auth } from './pages/Auth.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { History } from './pages/History.jsx';
import { Notes } from './pages/Notes.jsx';
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
        <Route path="/notes" element={<Notes />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;

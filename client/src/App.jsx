import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Auth } from './pages/Auth.jsx';
export const serverUrl = "http://localhost:5000";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;

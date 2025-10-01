import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

const HomePage = () => <h2>Welcome to the Hyperlocal Marketplace!</h2>;

function App() {
  const { token, logout } = useAuth();

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {token ? (
            <>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              | <Link to="/register">Register</Link>
              | <Link to="/login">Login</Link>
            </>
          )}
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
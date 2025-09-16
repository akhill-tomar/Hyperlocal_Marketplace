import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

// A simple placeholder for the home page
const HomePage = () => <h2>Welcome to the Hyperlocal Marketplace!</h2>;

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* We will add login and other routes here later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ProvidersListPage from './pages/ProvidersListPage';
import BookingPage from './pages/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
           <Route path="/services/:categoryId/providers" element={<ProvidersListPage />} />
           <Route path="/book/:providerServiceId" element={<BookingPage />} />
           <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
           <Route 
            path="/book/:providerServiceId" 
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
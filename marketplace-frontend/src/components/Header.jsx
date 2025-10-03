import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Hyperlocal Marketplace
          </Link>
        </Typography>

        {token ? (
          <Box>
            <Button color="inherit" onClick={() => navigate('/my-bookings')}>My Bookings</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        ) : (

          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
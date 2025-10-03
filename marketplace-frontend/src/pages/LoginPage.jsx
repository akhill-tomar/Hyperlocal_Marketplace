import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import MUI components
import { Button, Card, CardContent, TextField, Typography, Container, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setMessage(errorMsg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ minWidth: 400, padding: 2 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
              <LoginIcon color="primary" sx={{ fontSize: 40 }}/>
              <Typography component="h1" variant="h5">
                Welcome Back
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              {message && (
                <Typography color="error" align="center" variant="body2">
                  {message}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
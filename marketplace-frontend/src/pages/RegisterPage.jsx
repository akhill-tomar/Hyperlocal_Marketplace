import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

// Import additional MUI components for the dropdown
import { Button, Card, CardContent, TextField, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'CUSTOMER' // Set a default role
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await registerUser(formData); // formData now includes the role from the dropdown
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
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
              <PersonAddAltIcon color="primary" sx={{ fontSize: 40 }}/>
              <Typography component="h1" variant="h5">
                Create an Account
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {/* Removed the Grid layout to make fields full-width */}
              <TextField
                margin="normal"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
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
                autoComplete="new-password"
                onChange={handleChange}
              />
              
              {/* Added FormControl for the role selection dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-select-label">I am a...</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  name="role"
                  value={formData.role}
                  label="I am a..."
                  onChange={handleChange}
                >
                  <MenuItem value="CUSTOMER">Customer</MenuItem>
                  <MenuItem value="PROVIDER">Service Provider</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              {message && (
                <Typography color={message.includes('successful') ? 'success.main' : 'error'} align="center" variant="body2">
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

export default RegisterPage;
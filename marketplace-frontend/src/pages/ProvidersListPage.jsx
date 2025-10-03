import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getProvidersByCategoryId } from '../services/browserService';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, Alert, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 

function ProvidersListPage() {
  const { categoryId } = useParams(); 
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await getProvidersByCategoryId(categoryId);
        setProviders(response.data);
      } catch (err) {
        setError('Failed to load providers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [categoryId]);

  const handleBookNowClick = (providerServiceId) => {
    if (token) {
      navigate(`/book/${providerServiceId}`);
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Providers
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {providers.length === 0 && !error && (
        <Typography>No providers found for this service category.</Typography>
      )}

      <Grid container spacing={3}>
        {providers.map((provider) => (
          <Grid item key={provider.profileId} xs={12} md={6}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {provider.businessName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Provided by: {provider.providerFirstName}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {provider.bio}
                </Typography>
                <Typography variant="h6">
                  Starting at ₹{provider.pricePerHour}/hr
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                 <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleBookNowClick(provider.providerServiceId)}
                  >
                    Book Now
                 </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProvidersListPage;
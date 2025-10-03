import React, { useState, useEffect } from 'react';
import { getAllServiceCategories } from '../services/browserService';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllServiceCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load service categories. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/services/${categoryId}/providers`);
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
        Our Services
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find and book top-rated local service providers for any job.
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => handleCategoryClick(category.id)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
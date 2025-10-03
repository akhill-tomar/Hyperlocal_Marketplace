import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../services/bookingService';
import { Container, Typography, Card, CardContent, CircularProgress, Box, Alert, Grid } from '@mui/material';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load your bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography>You have not made any bookings yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item key={booking.id} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{booking.providerService.category.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    with {booking.providerService.profile.businessName}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Status: <strong>{booking.status}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Date: {new Date(booking.bookingTime).toLocaleString()}
                  </Typography>
                   <Typography variant="body2">
                    Address: {booking.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyBookingsPage;
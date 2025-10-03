import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProviderServiceById } from '../services/browserService';
import { createBooking } from '../services/bookingService'; // We'll add this next
import { Container, Typography, Card, CardContent, Button, Box, CircularProgress, Alert, TextField } from '@mui/material';

function BookingPage() {
    const { providerServiceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Form state
    const [bookingDetails, setBookingDetails] = useState({
      bookingTime: '',
      address: ''
    });

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await getProviderServiceById(providerServiceId);
                setService(response.data);
            } catch (err) {
                setError('Failed to load service details. The service may not exist.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServiceDetails();
    }, [providerServiceId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookingRequest = {
                providerServiceId: parseInt(providerServiceId),
                ...bookingDetails
            };
            // This will fail until we build the backend endpoint
            // await createBooking(bookingRequest); 
            alert('Booking request submitted successfully!');
            // navigate('/my-bookings'); // We will create this page later
        } catch (err) {
            setError('Failed to create booking. Please try again.');
            console.error(err);
        }
    };

    // --- IMPORTANT CHECKS ---
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;
    }
    
    // This is the crucial check that prevents the crash.
    if (!service) {
        return <Container sx={{ mt: 4 }}><Alert severity="info">Service details could not be loaded.</Alert></Container>;
    }

    return (
        <Container sx={{ mt: 4 }} maxWidth="sm">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Confirm Your Booking
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">{service.category.name}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            with {service.profile.businessName}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                            Price: ₹{service.pricePerHour}/hr
                        </Typography>
                    </Box>
                    
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Requested Date and Time"
                            name="bookingTime"
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                            value={bookingDetails.bookingTime}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Service Address"
                            name="address"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            value={bookingDetails.address}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Request Booking
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default BookingPage;
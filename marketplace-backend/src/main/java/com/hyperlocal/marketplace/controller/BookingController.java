package com.hyperlocal.marketplace.controller;

import com.hyperlocal.marketplace.dto.BookingRequestDTO;
import com.hyperlocal.marketplace.entity.Booking;
import com.hyperlocal.marketplace.entity.ProviderService;
import com.hyperlocal.marketplace.entity.User;
import com.hyperlocal.marketplace.repository.BookingRepository;
import com.hyperlocal.marketplace.repository.ProviderServiceRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository bookingRepository;
    private final ProviderServiceRepository providerServiceRepository;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @AuthenticationPrincipal User customer,
            @Valid @RequestBody BookingRequestDTO bookingRequest
    ) {
        ProviderService serviceToBook = providerServiceRepository.findById(bookingRequest.getProviderServiceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "The requested service does not exist."));

        Booking newBooking = new Booking();
        newBooking.setCustomer(customer);
        newBooking.setProviderService(serviceToBook);
        newBooking.setBookingTime(bookingRequest.getBookingTime());
        newBooking.setAddress(bookingRequest.getAddress());

        Booking savedBooking = bookingRepository.save(newBooking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }
}
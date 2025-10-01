package com.hyperlocal.marketplace.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequestDTO {

    @NotNull(message = "Provider service ID cannot be null")
    private Long providerServiceId;

    @NotNull(message = "Booking time cannot be null")
    @Future(message = "Booking time must be in the future")
    private LocalDateTime bookingTime;

    @NotEmpty(message = "Address cannot be empty")
    private String address;
}

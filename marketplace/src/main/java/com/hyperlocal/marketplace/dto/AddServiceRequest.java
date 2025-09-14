package com.hyperlocal.marketplace.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddServiceRequest {

    @NotNull(message = "Service category ID cannot be null")
    private Long serviceCategoryId;

    @NotNull(message = "Price per hour cannot be null")
    @Positive(message = "Price must be positive")
    private BigDecimal pricePerHour;

    private String serviceDescription;
}
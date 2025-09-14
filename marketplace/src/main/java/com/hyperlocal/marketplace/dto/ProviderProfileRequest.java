package com.hyperlocal.marketplace.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProviderProfileRequest {

    @NotEmpty(message = "Business name cannot be empty")
    private String businessName;

    private String bio;

    @PositiveOrZero(message = "Experience must be a positive number or zero")
    private int experienceInYears;
}
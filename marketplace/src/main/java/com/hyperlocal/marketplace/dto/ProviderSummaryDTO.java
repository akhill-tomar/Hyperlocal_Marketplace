package com.hyperlocal.marketplace.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProviderSummaryDTO {
    private Long profileId;
    private String businessName;
    private String bio;
    private int experienceInYears;
    private String providerFirstName;
    private BigDecimal pricePerHour;
}
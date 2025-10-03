package com.hyperlocal.marketplace.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "provider_services")
public class ProviderService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnoreProperties("services") // --- ADD THIS LINE ---
    @ToString.Exclude
    private ProviderProfile profile;

    @ManyToOne(fetch = FetchType.EAGER) // --- ENSURE THIS IS EAGER ---
    @JoinColumn(name = "category_id", nullable = false)
    private ServiceCategory category;

    @Column(precision = 10, scale = 2)
    private BigDecimal pricePerHour;

    @Column(columnDefinition = "TEXT")
    private String serviceDescription;
}
package com.hyperlocal.marketplace.controller;

import com.hyperlocal.marketplace.dto.AddServiceRequest;
import com.hyperlocal.marketplace.dto.ProviderProfileRequest;
import com.hyperlocal.marketplace.entity.ProviderProfile;
import com.hyperlocal.marketplace.entity.ProviderService;
import com.hyperlocal.marketplace.entity.ServiceCategory;
import com.hyperlocal.marketplace.entity.User;
import com.hyperlocal.marketplace.repository.ProviderProfileRepository;
import com.hyperlocal.marketplace.repository.ProviderServiceRepository;
import com.hyperlocal.marketplace.repository.ServiceCategoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/providers")
@RequiredArgsConstructor
public class ProviderController {

    private final ProviderProfileRepository providerProfileRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ProviderServiceRepository providerServiceRepository;

    @PostMapping("/profile")
    public ResponseEntity<ProviderProfile> createOrUpdateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProviderProfileRequest profileRequest
    ) {
        providerProfileRepository.findByUser(user).ifPresent(p -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Provider profile already exists.");
        });

        ProviderProfile profile = new ProviderProfile();
        profile.setUser(user);
        profile.setBusinessName(profileRequest.getBusinessName());
        profile.setBio(profileRequest.getBio());
        profile.setExperienceInYears(profileRequest.getExperienceInYears());

        ProviderProfile savedProfile = providerProfileRepository.save(profile);
        return new ResponseEntity<>(savedProfile, HttpStatus.CREATED);
    }

    @PostMapping("/services")
    public ResponseEntity<ProviderService> addService(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AddServiceRequest request
    ) {
        ProviderProfile profile = providerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provider profile not found. Please create one first."));

        ServiceCategory category = serviceCategoryRepository.findById(request.getServiceCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service Category not found."));

        ProviderService newService = new ProviderService();
        newService.setProfile(profile);
        newService.setCategory(category);
        newService.setPricePerHour(request.getPricePerHour());
        newService.setServiceDescription(request.getServiceDescription());

        ProviderService savedService = providerServiceRepository.save(newService);
        return new ResponseEntity<>(savedService, HttpStatus.CREATED);
    }
}
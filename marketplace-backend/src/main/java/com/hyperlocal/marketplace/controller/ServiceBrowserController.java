package com.hyperlocal.marketplace.controller;

import com.hyperlocal.marketplace.dto.ProviderSummaryDTO;
import com.hyperlocal.marketplace.dto.ServiceCategoryDTO;
import com.hyperlocal.marketplace.entity.ProviderService;
import com.hyperlocal.marketplace.entity.ServiceCategory;
import com.hyperlocal.marketplace.repository.ProviderServiceRepository;
import com.hyperlocal.marketplace.repository.ServiceCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api") // Common base path
@RequiredArgsConstructor
public class ServiceBrowserController {

    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ProviderServiceRepository providerServiceRepository;

    /**
     * Endpoint to get all available service categories.
     */
    @GetMapping("/services")
    public ResponseEntity<List<ServiceCategoryDTO>> getAllServiceCategories() {
        List<ServiceCategory> categories = serviceCategoryRepository.findAll();

        List<ServiceCategoryDTO> categoryDTOs = categories.stream().map(category -> {
            ServiceCategoryDTO dto = new ServiceCategoryDTO();
            dto.setId(category.getId());
            dto.setName(category.getName());
            dto.setDescription(category.getDescription());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(categoryDTOs);
    }

    /**
     * Endpoint to get all providers for a specific service category.
     */
    @GetMapping("/services/{categoryId}/providers")
    public ResponseEntity<List<ProviderSummaryDTO>> getProvidersByCategory(@PathVariable Long categoryId) {
        List<ProviderService> providerServices = providerServiceRepository.findByCategoryId(categoryId);

        List<ProviderSummaryDTO> providerDTOs = providerServices.stream().map(ps -> {
            ProviderSummaryDTO dto = new ProviderSummaryDTO();
            dto.setProviderServiceId(ps.getId());
            dto.setProfileId(ps.getProfile().getId());
            dto.setBusinessName(ps.getProfile().getBusinessName());
            dto.setBio(ps.getProfile().getBio());
            dto.setExperienceInYears(ps.getProfile().getExperienceInYears());
            dto.setProviderFirstName(ps.getProfile().getUser().getFirstName());
            dto.setPricePerHour(ps.getPricePerHour());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(providerDTOs);
    }

    /**
     * Endpoint to get the details of a single provider service offering.
     */
    @GetMapping("/provider-services/{id}")
    public ResponseEntity<ProviderService> getProviderServiceById(@PathVariable Long id) {
        ProviderService service = providerServiceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        return ResponseEntity.ok(service);
    }
}
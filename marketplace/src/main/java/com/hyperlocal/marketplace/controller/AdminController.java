package com.hyperlocal.marketplace.controller;

import com.hyperlocal.marketplace.entity.ServiceCategory;
import com.hyperlocal.marketplace.repository.ServiceCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ServiceCategoryRepository serviceCategoryRepository;

    @PostMapping("/services")
    public ResponseEntity<ServiceCategory> createServiceCategory(@RequestBody ServiceCategory serviceCategory) {
        ServiceCategory savedCategory = serviceCategoryRepository.save(serviceCategory);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping("/services")
    public ResponseEntity<List<ServiceCategory>> getAllServiceCategories() {
        List<ServiceCategory> categories = serviceCategoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }
}
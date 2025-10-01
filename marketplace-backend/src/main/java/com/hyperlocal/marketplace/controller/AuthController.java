package com.hyperlocal.marketplace.controller;

import com.hyperlocal.marketplace.dto.LoginRequest;
import com.hyperlocal.marketplace.dto.LoginResponse;
import com.hyperlocal.marketplace.dto.UserRegistrationRequest;
import com.hyperlocal.marketplace.dto.UserResponse;
import com.hyperlocal.marketplace.entity.User;
import com.hyperlocal.marketplace.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRegistrationRequest registrationRequest) {
        try {
            User newUser = authService.register(registrationRequest);
            UserResponse response = new UserResponse();
            response.setId(newUser.getId());
            response.setEmail(newUser.getEmail());
            response.setFirstName(newUser.getFirstName());
            response.setLastName(newUser.getLastName());
            response.setPhoneNumber(newUser.getPhoneNumber());
            response.setRole(newUser.getRole());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException e) {

            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
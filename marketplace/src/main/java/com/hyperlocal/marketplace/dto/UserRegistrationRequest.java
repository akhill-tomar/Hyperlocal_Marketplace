package com.hyperlocal.marketplace.dto;

import com.hyperlocal.marketplace.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegistrationRequest {

    @NotEmpty(message = "First name cannot be empty")
    private String firstName;

    private String lastName;

    @Email(message = "Provide a valid email address")
    @NotEmpty(message = "Email cannot be empty")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    private String password;

    @NotEmpty(message = "Phone number cannot be empty")
    private String phoneNumber;

    @NotNull(message = "Role cannot be null")
    private Role role;
}
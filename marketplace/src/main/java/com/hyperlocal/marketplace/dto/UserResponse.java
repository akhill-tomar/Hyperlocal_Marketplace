package com.hyperlocal.marketplace.dto;

import com.hyperlocal.marketplace.entity.Role;
import lombok.Data;

@Data
public class UserResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Role role;
}

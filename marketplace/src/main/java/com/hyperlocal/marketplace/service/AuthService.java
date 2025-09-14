package com.hyperlocal.marketplace.service;

import com.hyperlocal.marketplace.dto.LoginRequest;
import com.hyperlocal.marketplace.dto.LoginResponse;
import com.hyperlocal.marketplace.dto.UserRegistrationRequest;
import com.hyperlocal.marketplace.entity.User;

public interface AuthService {
    User register(UserRegistrationRequest registrationRequest);
    LoginResponse login(LoginRequest loginRequest);
}
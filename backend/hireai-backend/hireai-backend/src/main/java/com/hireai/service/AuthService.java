package com.hireai.service;

import com.hireai.dto.AuthResponse;
import com.hireai.dto.RegisterRequest;
import com.hireai.entity.User;
import com.hireai.enums.Role;
import com.hireai.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .company(request.getCompany())
                .role(Role.valueOf(request.getRole()))
                .verified(false)
                .build();

        userRepository.save(user);

        return new AuthResponse(
                "Account created successfully"
        );
    }
}

package com.hireai.service;

import com.hireai.dto.*;
import com.hireai.entity.PendingUser;
import com.hireai.entity.User;
import com.hireai.enums.Role;
import com.hireai.repository.PendingUserRepository;
import com.hireai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PendingUserRepository pendingUserRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    private static final SecureRandom secureRandom =
            new SecureRandom();

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null) {
            throw new RuntimeException("Email is required");
        }

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .company(request.getCompany())
                .role(Role.valueOf(request.getRole()))
                .verified(true)
                .build();

        userRepository.save(user);

        return new AuthResponse("User registered successfully");
    }

    public AuthResponse verifyOtp(
            OtpVerificationRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        PendingUser pendingUser =
                pendingUserRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Pending registration not found"
                                )
                        );

        if (pendingUser.getOtpAttempts() >= 5) {
            throw new RuntimeException(
                    "Maximum OTP attempts exceeded"
            );
        }

        if (LocalDateTime.now().isAfter(
                pendingUser.getOtpExpiration()
        )) {
            throw new RuntimeException(
                    "OTP expired"
            );
        }

        if (!pendingUser.getOtpCode().equals(
                request.getOtp()
        )) {

            pendingUser.setOtpAttempts(
                    pendingUser.getOtpAttempts() + 1
            );

            pendingUserRepository.save(
                    pendingUser
            );

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        User user = User.builder()
                .firstName(
                        pendingUser.getFirstName()
                )
                .lastName(
                        pendingUser.getLastName()
                )
                .email(
                        pendingUser.getEmail()
                )
                .password(
                        pendingUser.getPassword()
                )
                .company(
                        pendingUser.getCompany()
                )
                .role(
                        pendingUser.getRole()
                )
                .verified(true)
                .build();

        userRepository.save(user);

        pendingUserRepository.delete(
                pendingUser
        );

        return new AuthResponse(
                "Email verified successfully"
        );
    }

    public LoginResponse login (LoginRequest request) {
        if(request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Email and password are required");
        }

        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        ));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password ") ;
        }
        if (!user.isVerified()) {
            throw  new RuntimeException("Email not verified");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name()) ;


        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .firstName(user.getFirstName())
                .email(user.getEmail())
                .build() ; 
    }

    public AuthResponse resendOtp(
            String email
    ) {

        PendingUser pendingUser =
                pendingUserRepository
                        .findByEmail(
                                email.trim()
                                        .toLowerCase()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No pending registration found"
                                )
                        );

        String otp = String.format(
                "%06d",
                secureRandom.nextInt(1_000_000)
        );

        pendingUser.setOtpCode(
                otp
        );

        pendingUser.setOtpExpiration(
                LocalDateTime.now()
                        .plusMinutes(10)
        );

        pendingUser.setOtpAttempts(
                0
        );

        pendingUserRepository.save(
                pendingUser
        );

        emailService.sendOtpEmail(
                pendingUser.getEmail(),
                otp
        );

        return new AuthResponse(
                "OTP resent successfully"
        );
    }
}

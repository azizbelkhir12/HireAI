package com.hireai.service;

import com.hireai.dto.AuthResponse;
import com.hireai.dto.OtpVerificationRequest;
import com.hireai.dto.RegisterRequest;
import com.hireai.entity.PendingUser;
import com.hireai.entity.User;
import com.hireai.enums.Role;
import com.hireai.repository.PendingUserRepository;
import com.hireai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PendingUserRepository pendingUserRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthResponse register(
            RegisterRequest request
    ) {
        if(request.getEmail() == null) {
            throw new RuntimeException(
                    "Email is required"
            );
        }

        String email = request.getEmail().trim().toLowerCase();

        if(userRepository.existsByEmail(
                email
        )) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );

        PendingUser pendingUser =
                pendingUserRepository
                        .findByEmail(email)
                        .orElseGet(PendingUser::new);

        pendingUser.setFirstName(request.getFirstName());
        pendingUser.setLastName(request.getLastName());
        pendingUser.setEmail(email);
        pendingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        pendingUser.setCompany(request.getCompany());
        pendingUser.setRole(
                Role.valueOf(
                        request.getRole()
                )
        );
        pendingUser.setOtpCode(otp);
        pendingUser.setOtpExpiration(LocalDateTime.now().plusMinutes(10));
        pendingUser.setOtpAttempts(0);

        pendingUserRepository.save(
                pendingUser
        );

        emailService.sendOtpEmail(
                email,
                otp
        );

        return new AuthResponse(
                "OTP sent to email"
        );
    }

    public AuthResponse verifyOtp(
            OtpVerificationRequest request
    ) {
        if(request.getEmail() == null || request.getOtp() == null) {
            throw new RuntimeException(
                    "Email and OTP are required"
            );
        }

        String email = request.getEmail().trim().toLowerCase();
        String otp = request.getOtp().trim();

        PendingUser pendingUser =
                pendingUserRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                ));

        if(pendingUser
                .getOtpExpiration()
                .isBefore(
                        LocalDateTime.now()
                )) {

            throw new RuntimeException(
                    "OTP expired"
            );
        }

        int otpAttempts =
                pendingUser.getOtpAttempts() == null
                        ? 0
                        : pendingUser.getOtpAttempts();

        if(otpAttempts >= 5) {

            throw new RuntimeException(
                    "Too many attempts"
            );
        }

        if(!pendingUser
                .getOtpCode()
                .equals(otp)) {

            pendingUser.setOtpAttempts(
                    otpAttempts + 1
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

        pendingUserRepository.delete(pendingUser);

        return new AuthResponse(
                "Email verified"
        );
    }
}

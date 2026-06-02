package com.hireai.controller;

import com.hireai.dto.AuthResponse;
import com.hireai.dto.OtpVerificationRequest;
import com.hireai.dto.RegisterRequest;
import com.hireai.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse>
    register(
            @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse>
    verifyOtp(
            @RequestBody
            OtpVerificationRequest request
    ) {

        return ResponseEntity.ok(
                authService.verifyOtp(request)
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AuthResponse>
    handleRuntimeException(
            RuntimeException exception
    ) {

        return ResponseEntity.badRequest().body(
                new AuthResponse(
                        exception.getMessage()
                )
        );
    }
}

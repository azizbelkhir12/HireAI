package com.hireai.service;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final int MIN_SECRET_LENGTH = 32;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(
            String email,
            String role
    ) {

        SecretKey key = getSigningKey();

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )
                .signWith(key)
                .compact();
    }

    private SecretKey getSigningKey() {
        if(secret == null || secret.length() < MIN_SECRET_LENGTH) {
            throw new IllegalStateException(
                    "JWT secret must be at least 32 characters long"
            );
        }

        return Keys.hmacShaKeyFor(
                secret.getBytes(
                        StandardCharsets.UTF_8
                )
        );
    }
}

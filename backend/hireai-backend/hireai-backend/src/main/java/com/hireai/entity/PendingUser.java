package com.hireai.entity;


import com.hireai.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pending_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PendingUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    private String password;

    private String company;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String otpCode;

    private LocalDateTime otpExpiration;

    private Integer otpAttempts;

}

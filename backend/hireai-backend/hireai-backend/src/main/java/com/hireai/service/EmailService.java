package com.hireai.service;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mouhamedazizbelkhir20@gmail.com");
        message.setTo(email);
        message.setSubject("HireAI Email Verification");

        message.setText(
                "Hello,\n\n" +
                        "Your OTP verification code is: " + otp +
                        "\n\nThis code expires in 10 minutes.\n\n" +
                        "HireAI Team"
        );

        mailSender.send(message);
    }
}
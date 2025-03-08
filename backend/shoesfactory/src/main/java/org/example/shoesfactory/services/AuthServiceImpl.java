package org.example.shoesfactory.services;

import org.example.shoesfactory.services.interfaces.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class AuthServiceImpl implements AuthService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public String auth(String principal, String credentials) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(principal, credentials)
            );
            System.out.println("AUTH SUCCESS: " + auth);
        } catch (Exception e) {
            e.printStackTrace(); // Печатает реальную ошибку
            throw new BadCredentialsException("Invalid credentials");
        }

        return Base64.getEncoder()
                .encodeToString((principal + ":" + credentials)
                        .getBytes(StandardCharsets.UTF_8)
                );
    }
}

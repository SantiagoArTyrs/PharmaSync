package com.pharmasync.backend.service;

import com.pharmasync.backend.dto.AuthRequest;
import com.pharmasync.backend.dto.AuthResponse;
import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.repository.UserRepository;
import com.pharmasync.backend.config.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Correo no registrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña inválida");
        }

        return new AuthResponse(user, jwtUtils.generateToken(user));
    }
}
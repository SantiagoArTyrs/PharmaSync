package com.pharmasync.backend.service;


import com.pharmasync.backend.config.JwtUtils;
import com.pharmasync.backend.dto.AuthRequest;
import com.pharmasync.backend.dto.AuthResponse;
import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(AuthRequest request){
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already taken");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);

        return new AuthResponse(jwtUtils.generateToken(user.getUsername()));
    }

    public AuthResponse login (AuthRequest  request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(jwtUtils.generateToken(user.getUsername()));
    }
}

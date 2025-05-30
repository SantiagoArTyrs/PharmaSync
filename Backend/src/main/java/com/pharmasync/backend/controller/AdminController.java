package com.pharmasync.backend.controller;

import com.pharmasync.backend.entity.ClinicalFact;
import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.repository.ChatSessionRepository;
import com.pharmasync.backend.repository.ClinicalFactRepository;
import com.pharmasync.backend.repository.ClinicalSummaryRepository;
import com.pharmasync.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ChatSessionRepository chatSessionRepository;
    private final ClinicalSummaryRepository clinicalSummaryRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String userId = String.valueOf(id); // si usas String para userId en MongoDB, ajusta

        // Borrar sesiones (y mensajes embebidos)
        chatSessionRepository.deleteByUserId(userId);

        clinicalSummaryRepository.deleteByUserId(userId);

        // Borrar usuario (PostgreSQL)
        userRepository.deleteById(id);

        return ResponseEntity.ok("Usuario y datos relacionados eliminados correctamente.");
    }

}

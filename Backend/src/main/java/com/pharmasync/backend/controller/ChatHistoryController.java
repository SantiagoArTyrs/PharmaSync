package com.pharmasync.backend.controller;

import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.model.ChatSession;
import com.pharmasync.backend.repository.ChatSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/chat")
@RequiredArgsConstructor
public class ChatHistoryController {

    private final ChatSessionRepository chatSessionRepository;

    // Obtener historial de una sesión específica
    @GetMapping("/history/{sessionId}")
    public ResponseEntity<ChatSession> getChatHistory(@PathVariable String sessionId) {
        return ResponseEntity.ok(
                chatSessionRepository.findBySessionId(sessionId)
        );
    }

    @GetMapping("/sessions")
    public ResponseEntity<List<ChatSession>> getAllSessions(@AuthenticationPrincipal UserDetails user) {
        String userId = ((User) user).getId() + ""; // o getId(), si tienes una clase personalizada
        return ResponseEntity.ok(chatSessionRepository.findByUserId(userId));
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<String> deleteChatSession(@PathVariable String sessionId, @AuthenticationPrincipal User user) {
    ChatSession session = chatSessionRepository.findBySessionId(sessionId);
    
    if (session == null || !session.getUserId().equals(String.valueOf(user.getId()))) {
        return ResponseEntity.status(403).body("No autorizado para eliminar esta sesión.");
    }

    chatSessionRepository.delete(session);
    return ResponseEntity.ok("Sesión eliminada exitosamente.");
}


}

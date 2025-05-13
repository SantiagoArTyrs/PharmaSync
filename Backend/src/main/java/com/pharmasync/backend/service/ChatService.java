package com.pharmasync.backend.service;

import com.pharmasync.backend.dto.BotResponse;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.model.ChatSession;
import com.pharmasync.backend.repository.ChatMessageRepository;
import com.pharmasync.backend.repository.ChatSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository messageRepo;
    private final ChatSessionRepository sessionRepo;
    private final BotService botService;

    public List<ChatMessage> getMessagesForSession(String sessionId) {
        return messageRepo.findBySessionIdOrderByTimestampAsc(sessionId);
    }

    public void handleIncomingMessage(String sessionId, String sender, String text) {
        // 1. Guardar mensaje del usuario
        ChatMessage userMsg = new ChatMessage(null, sessionId, sender, text, Instant.now());
        messageRepo.save(userMsg);

        // 2. Consultar bot
        BotResponse botReply = botService.askBot(sessionId, text);

        // 3. Guardar respuesta del bot
        ChatMessage botMsg = new ChatMessage(null, sessionId, "bot", botReply.getReplyText(), Instant.now());
        messageRepo.save(botMsg);

        // 4. Guardar alergias detectadas en la sesión
        if (!botReply.getExtractedAllergies().isEmpty()) {
            ChatSession session = sessionRepo.findById(sessionId)
                    .orElseGet(() -> new ChatSession(sessionId, new HashSet<>()));

            Set<String> updatedAllergies = new HashSet<>(session.getAllergies());
            updatedAllergies.addAll(botReply.getExtractedAllergies());
            session.setAllergies(updatedAllergies);

            sessionRepo.save(session);
        }
    }
}

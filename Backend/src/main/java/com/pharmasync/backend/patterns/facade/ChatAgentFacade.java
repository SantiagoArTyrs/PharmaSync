package com.pharmasync.backend.patterns.facade;

import com.pharmasync.backend.dto.ChatMessageRequest;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.decorator.MessageComponent;
import com.pharmasync.backend.patterns.decorator.TimestampDecorator;
import com.pharmasync.backend.patterns.adapter.AIResponseAdapter;
import com.pharmasync.backend.service.ChatPersistenceService;
import com.pharmasync.backend.service.RedisChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatAgentFacade {

    private final RedisChatService redisService;
    private final AIResponseAdapter aiAdapter;
    private final ChatPersistenceService persistenceService;

    private ChatMessage toChatMessage(MessageComponent msg) {
        return ChatMessage.builder()
                .sessionId(msg.getSessionId())
                .sender(msg.getSender())
                .content(msg.getContent())
                .timestamp(msg.getTimestamp())
                .build();
    }

    public ChatMessage handleUserMessage(ChatMessageRequest request) {
        // 1. Crear y decorar el mensaje del usuario
        ChatMessage userMsg = ChatMessage.builder()
                .sessionId(request.getSessionId())
                .sender(request.getSender())
                .content(request.getContent())
                .build();

        MessageComponent decoratedUser = new TimestampDecorator(userMsg);

        // 2. Guardar en Redis
        redisService.saveMessage(request.getSessionId(), toChatMessage(decoratedUser));

        // 3. Recuperar historial para contexto
        List<ChatMessage> history = redisService.getMessages(request.getSessionId());

        // 4. Generar respuesta de IA (fuera de este facade: raw → adaptado)
        String prompt = buildPromptFromHistory(history);
        ChatMessage aiResponse = aiAdapter.adapt(prompt, request.getSessionId());

        // 5. Decorar la respuesta (timestamp)
        MessageComponent  decoratedResponse = new TimestampDecorator(aiResponse);

        // 6. Guardar respuesta en Redis
        redisService.saveMessage(request.getSessionId(), toChatMessage(decoratedResponse));

        return toChatMessage(decoratedResponse);
    }

    public void closeSession(String sessionId) {
        List<ChatMessage> history = redisService.getMessages(sessionId);
        persistenceService.persistSession(sessionId, history);
        redisService.deleteSession(sessionId);
    }

    private String buildPromptFromHistory(List<ChatMessage> history) {
        StringBuilder sb = new StringBuilder();
        for (ChatMessage msg : history) {
            sb.append(msg.getSender()).append(": ").append(msg.getContent()).append("\n");
        }
        return sb.toString();
    }
}

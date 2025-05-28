package com.pharmasync.backend.service;

import com.pharmasync.backend.dto.ChatMessageDTO;
import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.decorator.MessageComponent;
import com.pharmasync.backend.patterns.decorator.TypeDecorator;
import com.pharmasync.backend.patterns.decorator.TimestampDecorator;
import com.pharmasync.backend.patterns.facade.ChatAgentFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatAgentFacade chatAgentFacade;
    private final ChatPersistenceService chatPersistenceService;

        public List<ChatMessageResponse> processMessage(ChatMessageDTO messageDTO, String userId) {
        String userMessage = messageDTO.getContent();
        String sessionId = messageDTO.getSessionId();

        // Crear mensaje del usuario
        ChatMessage user = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .sessionId(sessionId)
                .sender("user")
                .content(userMessage)
                .timestamp(Instant.now())
                .build();

        // Obtener respuesta del bot
            String rawBotMessage = chatAgentFacade.sendMessageToAgent(userId, userMessage, sessionId).getContent();


            // Decorar
        MessageComponent decorated = new TypeDecorator(new TimestampDecorator(() -> rawBotMessage));
        String finalBotMessage = decorated.getMessage();

        // Crear mensaje del bot
        ChatMessage bot = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .sessionId(sessionId)
                .sender("bot")
                .content(finalBotMessage)
                .timestamp(Instant.now())
                .build();

        // Guardar ambos
        chatPersistenceService.persistSession(sessionId, List.of(user, bot), userId);

        // Devolver ambos
        return List.of(
                ChatMessageResponse.builder()
                        .id(user.getId())
                        .content(user.getContent())
                        .isUser(true)
                        .timestamp(user.getTimestamp().toString())
                        .sessionId(sessionId)
                        .build(),

                ChatMessageResponse.builder()
                        .id(bot.getId())
                        .content(bot.getContent())
                        .isUser(false)
                        .timestamp(bot.getTimestamp().toString())
                        .sessionId(sessionId)
                        .build()
        );
        }
}

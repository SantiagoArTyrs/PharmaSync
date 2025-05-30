package com.pharmasync.backend.service;

import com.pharmasync.backend.dto.ChatMessageDTO;
import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.decorator.MessageComponent;
import com.pharmasync.backend.patterns.decorator.MessageDecoratorBuilder;
import com.pharmasync.backend.patterns.facade.ChatAgentFacade;
import com.pharmasync.backend.patterns.observer.ChatEventListener;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatAgentFacade chatAgentFacade;
    private final ChatPersistenceService chatPersistenceService;

    @Getter
    private final List<ChatEventListener> listeners = new ArrayList<>();

    public List<ChatMessageResponse> processMessage(ChatMessageDTO messageDTO, String userId) {
        String userMessage = messageDTO.getContent();
        String sessionId = messageDTO.getSessionId();

        ChatMessage user = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .sessionId(sessionId)
                .sender("user")
                .content(userMessage)
                .timestamp(Instant.now())
                .build();

        long startTime = System.currentTimeMillis();

        String rawBotMessage = chatAgentFacade.sendMessageToAgent(userId, userMessage, sessionId).getContent();

        long duration = System.currentTimeMillis() - startTime;

        boolean isError = (rawBotMessage == null || rawBotMessage.isEmpty());

        MessageComponent baseMessage = () -> rawBotMessage != null ? rawBotMessage : "";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
        MessageComponent decorated = new MessageDecoratorBuilder(baseMessage)
                .addSanitizer()
                .addType("🤖 PharmaSync Bot:")
                .addTimestamp(formatter)
                .build();

        String finalBotMessage = decorated.getMessage();

        ChatMessage bot = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .sessionId(sessionId)
                .sender("bot")
                .content(finalBotMessage)
                .timestamp(Instant.now())
                .build();

        chatPersistenceService.persistSession(sessionId, List.of(user, bot), userId);

        for (ChatEventListener listener : listeners) {
            listener.onMessageProcessed(sessionId, userId, userMessage, duration, isError);
        }

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

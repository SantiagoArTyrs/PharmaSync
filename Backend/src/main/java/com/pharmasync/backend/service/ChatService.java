package com.pharmasync.backend.service;

import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.adapter.AIResponseAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final RedisChatService redisChatService;
    private final OpenAIClient openAIClient;
    private final AIResponseAdapter adapter;

    public ChatMessage handleIncomingMessage(String sessionId, String sender, String text) {

        // 1. Crear mensaje del usuario
        ChatMessage userMessage = ChatMessage.builder()
                .sessionId(sessionId)
                .sender(sender)
                .content(text)
                .timestamp(Instant.now())
                .build();

        // 2. Guardar en Redis
        redisChatService.saveMessage(sessionId, userMessage);

        // 3. Recuperar historial para generar contexto
        List<ChatMessage> history = redisChatService.getMessages(sessionId);
        String prompt = buildPrompt(history);

        // 4. Llamar a n8n
        String rawResponse = openAIClient.call(prompt, sessionId);

        // 5. Adaptar la respuesta
        ChatMessage botResponse = adapter.adapt(rawResponse, sessionId);

        // 6. Guardar respuesta también en Redis
        redisChatService.saveMessage(sessionId, botResponse);

        return botResponse;
    }

    private String buildPrompt(List<ChatMessage> history) {
        StringBuilder sb = new StringBuilder();
        for (ChatMessage message : history) {
            sb.append(message.getSender())
                    .append(": ")
                    .append(message.getContent())
                    .append("\n");
        }
        return sb.toString();
    }
}

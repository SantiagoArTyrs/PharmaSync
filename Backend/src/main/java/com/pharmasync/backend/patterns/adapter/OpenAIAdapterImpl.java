package com.pharmasync.backend.patterns.adapter;

import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.service.OpenAIClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OpenAIAdapterImpl implements AIResponseAdapter {

    private final OpenAIClient openAIClient;

    @Override
    public ChatMessage adapt(String prompt, String sessionId) {
        String responseText = openAIClient.call(prompt, sessionId);

        return ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .sessionId(sessionId)
                .sender("assistant")
                .content(cleanContent(responseText))
                .timestamp(Instant.now())
                .build();
    }

    private String cleanContent(String raw) {
        return raw.trim();
    }
}

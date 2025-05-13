package com.pharmasync.backend.service;

import com.pharmasync.backend.dto.BotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class BotService {

    private final WebClient n8nWebClient;

    /**
     * Envía el texto del usuario a n8n y recibe la respuesta del bot.
     */
    public BotResponse askBot(String sessionId, String userMessage) {
        return n8nWebClient.post()
                .uri("http://localhost:5678/webhook/pharma-agent")
                .bodyValue(Map.of(
                        "sessionId", sessionId,
                        "text", userMessage
                ))
                .retrieve()
                .bodyToMono(BotResponse.class)
                .block();  // en producción considera usar .subscribe() o manejo reactivo
    }
}

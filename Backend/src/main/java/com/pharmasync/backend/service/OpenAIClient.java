package com.pharmasync.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class OpenAIClient {

    @Value("${n8n.webhook.url:http://localhost:5678/webhook/agent}")
    private String n8nWebhookUrl; // define esto en tu application-dev.yml

    private final WebClient.Builder webClientBuilder;

    public String call(String prompt, String sessionId) {
        return webClientBuilder.build()
                .post()
                .uri(n8nWebhookUrl)
                .bodyValue(new PromptRequest(sessionId, prompt))
                .retrieve()
                .bodyToFlux(PromptResponse.class)         // 👈 acepta array
                .collectList()
                .map(list -> list.isEmpty() ? "Sin respuesta del agente IA" : list.get(0).response()) // 👈 extrae el primero
                .block();
    }

    private record PromptRequest(String sessionId, String content) {}

    private record PromptResponse(String response) {}
}

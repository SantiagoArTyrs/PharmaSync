package com.pharmasync.backend.patterns.facade;

import com.pharmasync.backend.dto.ChatMessageResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ChatAgentFacade {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${agent.n8n.url}")
    private String agentUrl;

    public ChatMessageResponse sendMessageToAgent(String messageContent, String sessionId) {
        // Crear el cuerpo de la solicitud para n8n
        Map<String, Object> body = new HashMap<>();
        body.put("content", messageContent);
        body.put("sessionId", sessionId);

        // Configurar headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Llamar al agente (n8n)
        ResponseEntity<Map> response = restTemplate.exchange(
                agentUrl,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        // Extraer la respuesta del bot
        String output = (String) response.getBody().get("response");

        // Generar ID y timestamp
        String id = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();

        // Construir y devolver ChatMessageResponse
        return ChatMessageResponse.builder()
                .id(id)
                .content(output)
                .isUser(false)
                .timestamp(timestamp)
                .sessionId(sessionId)
                .build();
    }
}

package com.pharmasync.backend.patterns.facade;

import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.patterns.strategy.SummaryDetectionStrategy;
import com.pharmasync.backend.service.ClinicalSummaryService;
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

    private final ClinicalSummaryService clinicalSummaryService;
    private final SummaryDetectionStrategy summaryStrategy;

    @Value("${agent.n8n.url}")
    private String agentUrl;

    // Nuevo: ahora recibimos también el userId
    public ChatMessageResponse sendMessageToAgent(String userId, String messageContent, String sessionId) {
        // 1. Preparar la solicitud para n8n
        Map<String, Object> body = new HashMap<>();
        body.put("content", messageContent);
        body.put("sessionId", sessionId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 2. Llamar al agente (n8n)
        ResponseEntity<Map> response = restTemplate.exchange(
                agentUrl,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        // 3. Obtener respuesta del bot
        String output = (String) response.getBody().get("response");

        // 4. Generar ID y timestamp
        String id = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();

        // 5. Guardar resumen clínico si aplica
        if (summaryStrategy.isRelevant(messageContent)) {
            String type = summaryStrategy.detectType(messageContent);
            clinicalSummaryService.saveSummary(userId, sessionId, messageContent, output, type);
        }

        // 6. Devolver respuesta al frontend
        return ChatMessageResponse.builder()
                .id(id)
                .content(output)
                .isUser(false)
                .timestamp(timestamp)
                .sessionId(sessionId)
                .build();
    }
}

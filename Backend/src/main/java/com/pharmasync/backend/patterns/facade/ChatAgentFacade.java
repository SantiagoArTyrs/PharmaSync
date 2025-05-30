package com.pharmasync.backend.patterns.facade;

import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.model.ClinicalSummary;
import com.pharmasync.backend.patterns.strategy.SummaryStrategySelector;
import com.pharmasync.backend.service.ClinicalSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.pharmasync.backend.patterns.adapter.ClinicalSummaryAdapter;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ChatAgentFacade {

    private final RestTemplate restTemplate = new RestTemplate();

    private final ClinicalSummaryService clinicalSummaryService;
    private final SummaryStrategySelector summaryStrategySelector;

    private final ClinicalSummaryAdapter clinicalSummaryAdapter;  // inyecta el adaptador

    @Value("${agent.n8n.url}")
    private String agentUrl;

    public ChatMessageResponse sendMessageToAgent(String userId, String messageContent, String sessionId) {
        Map<String, Object> body = new HashMap<>();
        body.put("content", messageContent);
        body.put("sessionId", sessionId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(agentUrl, HttpMethod.POST, requestEntity, Map.class);

        Map<String, Object> rawResponse = response.getBody();

        var strategy = summaryStrategySelector.selectStrategy(messageContent);

        String rawAnswer = (String) rawResponse.get("response");


        String processedAnswer = strategy.processAnswer(rawAnswer);

        System.out.println("Mensaje recibido: " + messageContent);
        System.out.println("Estrategia seleccionada: " + strategy.getType());
        System.out.println("Es relevante?: " + strategy.isRelevant(messageContent));
        System.out.println("Respuesta procesada: " + processedAnswer);

        if (strategy.isRelevant(messageContent) && !"none".equals(strategy.getType())) {
            String type = strategy.getType();

            ClinicalSummary summary = clinicalSummaryAdapter.adapt(rawResponse, userId, sessionId, messageContent);

            summary.setType(type);

            clinicalSummaryService.saveSummary(summary.getUserId(), summary.getSessionId(), summary.getQuestion(), processedAnswer, summary.getType());
        }

        String id = UUID.randomUUID().toString();
        String timestamp = Instant.now().toString();

        return ChatMessageResponse.builder()
                .id(id)
                .content(processedAnswer)
                .isUser(false)
                .timestamp(timestamp)
                .sessionId(sessionId)
                .build();
    }

}

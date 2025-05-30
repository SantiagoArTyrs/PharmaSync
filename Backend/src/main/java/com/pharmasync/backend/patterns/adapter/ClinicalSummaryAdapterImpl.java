package com.pharmasync.backend.patterns.adapter;

import com.pharmasync.backend.model.ClinicalSummary;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
public class ClinicalSummaryAdapterImpl implements ClinicalSummaryAdapter{

    @Override
    public ClinicalSummary adapt(Map<String, Object> rawResponse, String userId, String sessionId, String question) {

        String answer = (String) rawResponse.get("response");

        String type = "general";

        return ClinicalSummary.builder()
                .userId(userId)
                .sessionId(sessionId)
                .question(question)
                .answer(answer)
                .type(type)
                .timestamp(LocalDateTime.now())
                .build();
    }
}

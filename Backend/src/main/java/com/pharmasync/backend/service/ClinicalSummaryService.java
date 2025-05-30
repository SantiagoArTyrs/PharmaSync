package com.pharmasync.backend.service;

import com.pharmasync.backend.model.ClinicalSummary;
import com.pharmasync.backend.repository.ClinicalSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClinicalSummaryService {

    private final ClinicalSummaryRepository summaryRepository;

    @Autowired
    public ClinicalSummaryService(ClinicalSummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    public ClinicalSummary saveSummary(String userId, String sessionId, String question, String answer, String type) {
        ClinicalSummary summary = ClinicalSummary.builder()
                .userId(userId)
                .sessionId(sessionId)
                .question(question)
                .answer(answer)
                .type(type)
                .timestamp(LocalDateTime.now())
                .build();

        return summaryRepository.save(summary);
    }

    public List<ClinicalSummary> getAllSummaries() {
        return summaryRepository.findAll();
    }

    public List<ClinicalSummary> getSummariesByUser(String userId) {
        return summaryRepository.findByUserId(userId);
    }

    public List<ClinicalSummary> getSummariesBySession(String sessionId) {
        return summaryRepository.findBySessionId(sessionId);
    }

    public List<ClinicalSummary> getSummariesByType(String type) {
        return summaryRepository.findByType(type);
    }
}

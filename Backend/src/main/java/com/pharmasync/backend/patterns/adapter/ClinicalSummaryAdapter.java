package com.pharmasync.backend.patterns.adapter;

import com.pharmasync.backend.model.ClinicalSummary;

import java.util.Map;

public interface ClinicalSummaryAdapter {
    ClinicalSummary adapt(Map<String, Object> rawResponse, String userId, String sessionId, String question);
}

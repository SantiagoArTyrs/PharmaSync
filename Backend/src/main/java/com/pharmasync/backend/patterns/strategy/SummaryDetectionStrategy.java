package com.pharmasync.backend.patterns.strategy;

public interface SummaryDetectionStrategy {
    boolean isRelevant(String message);
    boolean matches(String message);
    String getType();
    default String processAnswer(String rawAnswer) {
        return rawAnswer;
    }

}

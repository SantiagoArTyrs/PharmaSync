package com.pharmasync.backend.patterns.strategy;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SummaryStrategySelector {

    private final List<SummaryDetectionStrategy> strategies;

    public SummaryDetectionStrategy selectStrategy(String message) {
        return strategies.stream()
                .filter(strategy -> strategy.isRelevant(message))
                .findFirst()
                .orElseGet(this::getDefaultStrategy);
    }

    private SummaryDetectionStrategy getDefaultStrategy() {
        return new SummaryDetectionStrategy() {
            @Override
            public boolean isRelevant(String message) {
                return true; // Siempre relevante para fallback
            }

            @Override
            public boolean matches(String message) {
                return false; // No coincide con ningún patrón específico
            }

            @Override
            public String getType() {
                return "none"; // Tipo indicativo de no estrategia
            }

            @Override
            public String processAnswer(String rawAnswer) {
                // No hace nada, devuelve el texto sin cambios
                return rawAnswer;
            }
        };
    }
}

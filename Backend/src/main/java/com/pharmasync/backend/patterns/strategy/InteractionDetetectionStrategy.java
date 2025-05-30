package com.pharmasync.backend.patterns.strategy;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InteractionDetetectionStrategy implements SummaryDetectionStrategy {

    private static final List<String> KEYWORDS = List.of(
            "es compatible",
            "mezclar",
            "puedo tomar",
            "tomar juntos",
            "interacción",
            "alcohol"
    );

    @Override
    public boolean isRelevant(String message) {
        return matches(message);
    }

    @Override
    public boolean matches(String message) {
        String lower = message.toLowerCase();
        return KEYWORDS.stream().anyMatch(lower::contains);
    }

    @Override
    public String getType() {
        return "interaction";
    }

    @Override
    public String processAnswer(String rawAnswer) {
        if (rawAnswer == null || rawAnswer.isEmpty()) {
            return "";
        }
        return rawAnswer;
    }
}

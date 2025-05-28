package com.pharmasync.backend.patterns.strategy;

import org.springframework.stereotype.Component;

@Component
public class SummaryDetectionStrategy {

    public boolean isRelevant(String message) {
        String lower = message.toLowerCase();
        return lower.contains("puedo") ||
                lower.contains("qué puedo") ||
                lower.contains("es compatible") ||
                lower.contains("tengo") ||
                lower.contains("me duele") ||
                lower.contains("tomar") ||
                lower.contains("recomiendas");
    }

    public String detectType(String message) {
        String lower = message.toLowerCase();

        // Interacciones farmacológicas
        if (lower.contains("es compatible") ||
                lower.contains("mezclar") ||
                lower.contains("puedo tomar") ||
                lower.contains("tomar juntos") ||
                lower.contains("tomar con") ||
                lower.contains("interacción") ||
                lower.contains("alcohol") ||
                (lower.contains("puedo") && lower.contains("con"))) {
            return "interaction";
        }

        // Síntomas o condiciones
        if (lower.contains("tengo") ||
                lower.contains("me duele") ||
                lower.contains("dolor") ||
                lower.contains("fiebre") ||
                lower.contains("síntoma") ||
                lower.contains("me siento")) {
            return "symptom";
        }

        // Por defecto: pregunta general
        return "general";
    }

}

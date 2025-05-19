package com.pharmasync.backend.patterns.strategy;

import com.pharmasync.backend.model.ChatMessage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SummaryStrategy implements ResponseStrategy {

    @Override
    public String buildPrompt(List<ChatMessage> history) {
        return "Genera un resumen clínico estructurado de la siguiente conversación:\n" +
                history.stream()
                        .map(msg -> msg.getSender() + ": " + msg.getContent())
                        .collect(Collectors.joining("\n"));
    }
}

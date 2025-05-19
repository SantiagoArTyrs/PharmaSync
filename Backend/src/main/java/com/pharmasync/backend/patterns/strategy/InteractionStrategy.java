package com.pharmasync.backend.patterns.strategy;

import com.pharmasync.backend.model.ChatMessage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class InteractionStrategy implements ResponseStrategy {

    @Override
    public String buildPrompt(List<ChatMessage> history) {
        return "Analiza posibles interacciones farmacológicas en esta conversación:\n" +
                history.stream()
                        .map(msg -> msg.getSender() + ": " + msg.getContent())
                        .collect(Collectors.joining("\n"));
    }
}

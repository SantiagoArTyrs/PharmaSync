package com.pharmasync.backend.patterns.strategy;

import com.pharmasync.backend.model.ChatMessage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class StrategyContext {

    private final Map<String, ResponseStrategy> strategies;

    public StrategyContext(List<ResponseStrategy> strategyList) {
        this.strategies = strategyList.stream()
                .collect(java.util.stream.Collectors.toMap(
                        s -> s.getClass().getSimpleName(), s -> s
                ));
    }

    public String generatePrompt(String type, List<ChatMessage> history) {
        ResponseStrategy strategy = strategies.getOrDefault(type, strategies.get("InteractionStrategy"));
        return strategy.buildPrompt(history);
    }
}

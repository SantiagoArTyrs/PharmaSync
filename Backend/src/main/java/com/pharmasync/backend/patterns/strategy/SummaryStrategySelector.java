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
                .orElseThrow(() -> new IllegalStateException("No strategy found"));
    }
}

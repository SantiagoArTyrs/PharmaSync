package com.pharmasync.backend.patterns.strategy;

import com.pharmasync.backend.model.ChatMessage;
import java.util.List;

public interface ResponseStrategy {
    String buildPrompt(List<ChatMessage> history);
}

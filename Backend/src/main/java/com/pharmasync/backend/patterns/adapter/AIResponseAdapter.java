package com.pharmasync.backend.patterns.adapter;

import com.pharmasync.backend.model.ChatMessage;

public interface AIResponseAdapter {
    ChatMessage adapt(String externalResponse, String sessionId);
}

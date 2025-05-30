package com.pharmasync.backend.patterns.observer;

public interface ChatEventListener {
    void onMessageProcessed(String sessionId, String userId, String message, long processingTimeMillis, boolean isError);
}

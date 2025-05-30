package com.pharmasync.backend.patterns.observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingChatEventListener implements ChatEventListener {

    private static final Logger logger = LoggerFactory.getLogger(LoggingChatEventListener.class);

    @Override
    public void onMessageProcessed(String sessionId, String userId, String message, long processingTimeMillis, boolean isError) {
        logger.info("Mensaje procesado en sesión {}: usuario {} dijo '{}'. Tiempo procesamiento: {} ms. Error: {}",
                sessionId, userId, message, processingTimeMillis, isError);
    }
}

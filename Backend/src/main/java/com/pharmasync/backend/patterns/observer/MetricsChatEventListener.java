package com.pharmasync.backend.patterns.observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.LongAdder;

public class MetricsChatEventListener implements ChatEventListener {

    private static final Logger logger = LoggerFactory.getLogger(MetricsChatEventListener.class);

    private final AtomicInteger messagesProcessed = new AtomicInteger(0);
    private final Map<String, AtomicInteger> messagesPerUser = new ConcurrentHashMap<>();
    private final Map<String, AtomicInteger> messagesPerSession = new ConcurrentHashMap<>();
    private final LongAdder totalProcessingTimeMillis = new LongAdder();
    private final AtomicInteger processedEvents = new AtomicInteger(0);
    private final AtomicInteger errorCount = new AtomicInteger(0);

    @Override
    public void onMessageProcessed(String sessionId, String userId, String message, long processingTimeMillis, boolean isError) {
        int total = messagesProcessed.incrementAndGet();
        messagesPerUser.computeIfAbsent(userId, k -> new AtomicInteger(0)).incrementAndGet();
        messagesPerSession.computeIfAbsent(sessionId, k -> new AtomicInteger(0)).incrementAndGet();

        totalProcessingTimeMillis.add(processingTimeMillis);
        processedEvents.incrementAndGet();

        if (isError) {
            errorCount.incrementAndGet();
        }

        logger.info("Métrica: Total mensajes={}, Usuario[{}]={}, Sesión[{}]={}, Tiempo procesado={}ms, Errores={}",
                total,
                userId, messagesPerUser.get(userId).get(),
                sessionId, messagesPerSession.get(sessionId).get(),
                processingTimeMillis,
                errorCount.get()
        );
    }

    public int getMessagesProcessedCount() {
        return messagesProcessed.get();
    }

    public int getErrorCount() {
        return errorCount.get();
    }

    public double getAverageProcessingTimeMillis() {
        int events = processedEvents.get();
        return events == 0 ? 0 : (double) totalProcessingTimeMillis.sum() / events;
    }

    public Map<String, Integer> getMessagesPerUser() {
        return toIntMap(messagesPerUser);
    }

    public Map<String, Integer> getMessagesPerSession() {
        return toIntMap(messagesPerSession);
    }

    private Map<String, Integer> toIntMap(Map<String, AtomicInteger> source) {
        Map<String, Integer> result = new ConcurrentHashMap<>();
        source.forEach((k, v) -> result.put(k, v.get()));
        return result;
    }
}

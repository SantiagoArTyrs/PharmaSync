package com.pharmasync.backend.patterns.decorator;

import java.time.Instant;

public class TimestampDecorator extends ChatMessageDecorator {

    private final Instant timestamp;

    public TimestampDecorator(MessageComponent wrapped) {
        super(wrapped);
        this.timestamp = (wrapped.getTimestamp() != null) ? wrapped.getTimestamp() : Instant.now();
    }

    @Override
    public Instant getTimestamp() {
        return timestamp;
    }
}

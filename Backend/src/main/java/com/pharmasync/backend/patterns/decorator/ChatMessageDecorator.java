package com.pharmasync.backend.patterns.decorator;

import java.time.Instant;

public abstract class ChatMessageDecorator implements MessageComponent {

    protected final MessageComponent wrapped;

    public ChatMessageDecorator(MessageComponent wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public String getSender() {
        return wrapped.getSender();
    }

    @Override
    public String getContent() {
        return wrapped.getContent();
    }

    @Override
    public Instant getTimestamp() {
        return wrapped.getTimestamp();
    }

    @Override
    public String getSessionId() {
        return wrapped.getSessionId();
    }
}

package com.pharmasync.backend.patterns.decorator;

public abstract class ChatMessageDecorator implements MessageComponent {
    protected MessageComponent component;

    public ChatMessageDecorator(MessageComponent component) {
        this.component = component;
    }

    @Override
    public String getMessage() {
        return component.getMessage();
    }
}

package com.pharmasync.backend.patterns.decorator;

public class TypeDecorator extends ChatMessageDecorator {
    public TypeDecorator(MessageComponent component) {
        super(component);
    }

    @Override
    public String getMessage() {
        return "🤖 Bot:\n" + component.getMessage();
    }
}

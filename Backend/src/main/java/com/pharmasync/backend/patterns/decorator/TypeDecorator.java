package com.pharmasync.backend.patterns.decorator;

public class TypeDecorator extends ChatMessageDecorator {
    private final String prefix;

    public TypeDecorator(MessageComponent component, String prefix) {
        super(component);
        this.prefix = prefix;
    }

    public TypeDecorator(MessageComponent component) {
        this(component, "🤖 Bot:");
    }

    @Override
    public String getMessage() {
        return prefix + "\n" + component.getMessage();
    }
}

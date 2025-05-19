package com.pharmasync.backend.patterns.decorator;

public class TypeDecorator extends ChatMessageDecorator {

    private final String type;

    public TypeDecorator(MessageComponent wrapped, String type) {
        super(wrapped);
        this.type = type;
    }

    public String getType() {
        return type;
    }
}

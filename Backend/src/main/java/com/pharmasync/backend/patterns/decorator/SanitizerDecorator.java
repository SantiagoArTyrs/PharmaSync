package com.pharmasync.backend.patterns.decorator;

public class SanitizerDecorator extends ChatMessageDecorator {

    public SanitizerDecorator(MessageComponent component) {
        super(component);
    }

    @Override
    public String getMessage() {
        String original = component.getMessage();
        if (original == null) return "";

        String sanitized = original.replaceAll("\\p{C}", "").trim();

        // Puedes añadir más reglas según necesidad
        return sanitized;
    }
}

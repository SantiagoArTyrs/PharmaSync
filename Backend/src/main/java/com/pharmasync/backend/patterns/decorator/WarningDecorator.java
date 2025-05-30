package com.pharmasync.backend.patterns.decorator;

public class WarningDecorator extends ChatMessageDecorator {

    private final String warningText;

    public WarningDecorator(MessageComponent component, String warningText) {
        super(component);
        this.warningText = warningText;
    }

    @Override
    public String getMessage() {
        return component.getMessage() + "\n\n⚠️ Advertencia: " + warningText;
    }
}

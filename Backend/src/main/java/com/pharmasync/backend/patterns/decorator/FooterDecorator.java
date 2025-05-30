package com.pharmasync.backend.patterns.decorator;

public class FooterDecorator extends ChatMessageDecorator {

    private final String footerText;

    public FooterDecorator(MessageComponent component, String footerText) {
        super(component);
        this.footerText = footerText;
    }

    @Override
    public String getMessage() {
        return component.getMessage() + "\n\n---\n" + footerText;
    }
}

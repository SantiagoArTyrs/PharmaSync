package com.pharmasync.backend.patterns.decorator;

import java.time.format.DateTimeFormatter;

public class MessageDecoratorBuilder {
    private MessageComponent component;

    public MessageDecoratorBuilder(MessageComponent base) {
        this.component = base;
    }

    public MessageDecoratorBuilder addTimestamp() {
        this.component = new TimestampDecorator(this.component);
        return this;
    }

    public MessageDecoratorBuilder addTimestamp(DateTimeFormatter formatter) {
        this.component = new TimestampDecorator(this.component, formatter);
        return this;
    }

    public MessageDecoratorBuilder addType(String prefix) {
        this.component = new TypeDecorator(this.component, prefix);
        return this;
    }

    public MessageDecoratorBuilder addType() {
        this.component = new TypeDecorator(this.component);
        return this;
    }

    public MessageDecoratorBuilder addWarning(String warningText) {
        this.component = new WarningDecorator(this.component, warningText);
        return this;
    }

    public MessageDecoratorBuilder addFooter(String footerText) {
        this.component = new FooterDecorator(this.component, footerText);
        return this;
    }

    public MessageDecoratorBuilder addSanitizer() {
        this.component = new SanitizerDecorator(this.component);
        return this;
    }


    public MessageComponent build() {
        return component;
    }
}

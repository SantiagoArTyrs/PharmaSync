package com.pharmasync.backend.patterns.decorator;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimestampDecorator extends ChatMessageDecorator {
    private final DateTimeFormatter formatter;

    public TimestampDecorator(MessageComponent component, DateTimeFormatter formatter) {
        super(component);
        this.formatter = formatter != null ? formatter : DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    }

    public TimestampDecorator(MessageComponent component) {
        this(component, null);
    }

    @Override
    public String getMessage() {
        return component.getMessage() + "\n\n🕒 " + LocalDateTime.now().format(formatter);
    }
}

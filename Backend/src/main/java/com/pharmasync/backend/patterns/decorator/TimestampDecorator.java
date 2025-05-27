package com.pharmasync.backend.patterns.decorator;

import java.time.LocalDateTime;

public class TimestampDecorator extends ChatMessageDecorator {
    public TimestampDecorator(MessageComponent component) {
        super(component);
    }

    @Override
    public String getMessage() {
        return component.getMessage() + "\n\n🕒 " + LocalDateTime.now();
    }
}

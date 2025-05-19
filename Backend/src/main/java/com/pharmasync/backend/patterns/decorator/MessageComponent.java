package com.pharmasync.backend.patterns.decorator;

import java.time.Instant;

public interface MessageComponent {
    String getSender();
    String getContent();
    Instant getTimestamp();
    String getSessionId();
}

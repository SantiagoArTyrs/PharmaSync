package com.pharmasync.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {
    private String sessionId;
    private String sender;      // "user" o "assistant"
    private String content;     // Texto del mensaje
    private Instant timestamp;  // Puede ser null si se genera en el backend
}

package com.pharmasync.backend.model;


import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    private Long id;

    private String sessionId; // Id del chat
    private String sender; // Username o "bot"
    private String content; // Contenido
    private Instant timestamp;

}

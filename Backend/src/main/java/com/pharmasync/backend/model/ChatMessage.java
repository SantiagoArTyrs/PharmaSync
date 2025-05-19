package com.pharmasync.backend.model;

import com.pharmasync.backend.patterns.decorator.MessageComponent;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Document(collection = "chat_messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage implements MessageComponent {

    @Id
    private String id;

    private String sessionId;  // Id del chat
    private String sender;     // Username o "bot"
    private String content;    // Contenido
    private Instant timestamp; // Momento del mensaje

}

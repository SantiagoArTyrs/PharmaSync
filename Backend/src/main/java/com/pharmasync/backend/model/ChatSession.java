package com.pharmasync.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "chat_sessions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatSession {

    @Id
    private String sessionId;

    private List<ChatMessage> messages;
}


package com.pharmasync.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.List;

@Document(collection = "chat_sessions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatSession {

    @Id
    private String sessionId;
    private String userId;

    private List<ChatMessage> messages;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

        @JsonProperty("id")
    public String getId() {
        return sessionId;
    }
}

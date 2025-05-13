package com.pharmasync.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "chat_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSession {

    @Id
    private String sessionId;

    @Builder.Default
    private Set<String> allergies = new HashSet<>();


    //  añadir otros campos de contexto, p.ej. síntomas registrados, datos de usuario, etc.
}

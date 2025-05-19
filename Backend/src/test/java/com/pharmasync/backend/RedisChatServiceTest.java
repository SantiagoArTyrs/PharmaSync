package com.pharmasync.backend;

import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.service.RedisChatService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RedisChatServiceTest {

    @Autowired
    private RedisChatService redisChatService;

    @Test
    void saveAndRetrieveMessages() {
        String sessionId = "test-session-001";

        ChatMessage message = ChatMessage.builder()
                .sessionId(sessionId)
                .sender("user")
                .content("¿Puedo tomar paracetamol?")
                .timestamp(Instant.now())
                .build();

        redisChatService.saveMessage(sessionId, message);
        List<ChatMessage> messages = redisChatService.getMessages(sessionId);

        assertThat(messages).isNotEmpty();
        assertThat(messages.get(0).getContent()).contains("paracetamol");

        // Limpieza (opcional)
        redisChatService.deleteSession(sessionId);
    }
}

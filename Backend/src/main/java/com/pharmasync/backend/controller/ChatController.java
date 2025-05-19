package com.pharmasync.backend.controller;

import com.pharmasync.backend.dto.ChatMessageDTO;
import com.pharmasync.backend.dto.ChatMessageRequest;
import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.facade.ChatAgentFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatAgentFacade chatAgentFacade;

    @PostMapping("/send")
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody ChatMessageRequest request) {
        ChatMessage response = chatAgentFacade.handleUserMessage(request);

        ChatMessageDTO dto = ChatMessageDTO.builder()
                .sessionId(response.getSessionId())
                .sender(response.getSender())
                .content(response.getContent())
                .timestamp(response.getTimestamp())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/end/{sessionId}")
    public ResponseEntity<Void> endSession(@PathVariable String sessionId) {
        chatAgentFacade.closeSession(sessionId);
        return ResponseEntity.ok().build();
    }

    /*
    @GetMapping("/messages/{sessionId}")
    public List<ChatMessage> getMessages(@PathVariable String sessionId) {
        return chatAgentFacade.getAllMessages(sessionId); // opcional si agregas este método
    }

     */
}

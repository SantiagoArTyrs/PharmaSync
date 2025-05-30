package com.pharmasync.backend.controller;

import com.pharmasync.backend.dto.ChatMessageDTO;
import com.pharmasync.backend.dto.ChatMessageRequest;
import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.patterns.facade.ChatAgentFacade;
import com.pharmasync.backend.service.ChatService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<List<ChatMessageResponse>> sendMessage(
            @RequestBody ChatMessageRequest request,
            @AuthenticationPrincipal User user
    ) {
        ChatMessageDTO dto = ChatMessageDTO.builder()
                .content(request.getContent())
                .sessionId(request.getSessionId())
                .sender(request.getSender())
                .build();

        return ResponseEntity.ok(chatService.processMessage(dto, String.valueOf(user.getId())));
    }

}

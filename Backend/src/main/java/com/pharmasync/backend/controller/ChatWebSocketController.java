package com.pharmasync.backend.controller;

import com.pharmasync.backend.dto.ChatMessageRequest;
import com.pharmasync.backend.dto.ChatMessageResponse;
import com.pharmasync.backend.patterns.facade.ChatAgentFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatAgentFacade chatAgentFacade;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessageResponse receiveMessage(@Payload ChatMessageRequest message) {
        return chatAgentFacade.sendMessageToAgent(
                message.getUserId(),           // <- nuevo
                message.getContent(),
                message.getSessionId()
        );
    }
}


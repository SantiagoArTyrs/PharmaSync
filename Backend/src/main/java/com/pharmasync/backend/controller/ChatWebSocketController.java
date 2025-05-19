package com.pharmasync.backend.controller;

import com.pharmasync.backend.dto.ChatMessageRequest;
import com.pharmasync.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;

    @MessageMapping("/chat")
    public String receiveMessage(@Payload ChatMessageRequest message){
        chatService.handleIncomingMessage(
                message.getSessionId(),
                message.getSender(),
                message.getContent()
        );
        return "Mensaje recibido y procesado";
    }

}

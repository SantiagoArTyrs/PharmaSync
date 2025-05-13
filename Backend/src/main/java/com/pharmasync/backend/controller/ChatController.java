package com.pharmasync.backend.controller;

import com.pharmasync.backend.service.ChatService;
import com.pharmasync.backend.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * Endpoint para enviar un mensaje y recibir la respuesta del bot.
     * @param sessionId ID de la sesión de chat.
     * @param sender Quien envía el mensaje (usuario o bot).
     * @param text Texto del mensaje.
     */
    @PostMapping("/send")
    @ResponseStatus(HttpStatus.CREATED)
    public void sendMessage(@RequestParam String sessionId,
                            @RequestParam String sender,
                            @RequestParam String text) {
        chatService.handleIncomingMessage(sessionId, sender, text);
    }

    /**
     * Endpoint para obtener la conversación completa de una sesión.
     * @param sessionId ID de la sesión de chat.
     * @return Lista de mensajes de la sesión.
     */
    @GetMapping("/messages/{sessionId}")
    public List<ChatMessage> getMessages(@PathVariable String sessionId) {
        return chatService.getMessagesForSession(sessionId);
    }
}

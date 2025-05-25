package com.example.backend.controller;

import com.example.backend.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {



    @MessageMapping("/chat")             // from client → /app/chat
    @SendTo("/topic/messages")           // broadcast to /topic/messages
    public ChatMessage send(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now().toString());
        return message;
    }
}

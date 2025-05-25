package com.example.backend.controller;

import com.example.backend.entity.ChatLog;
import com.example.backend.model.ChatMessage;
import com.example.backend.repository.ChatLogRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.time.LocalDateTime;

@Controller
public class ChatController {
    private final ChatLogRepository chatLogRepo;

    public ChatController(ChatLogRepository chatLogRepo) {
        this.chatLogRepo = chatLogRepo;
    }


    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now().toString());
        ChatLog log = new ChatLog();
        log.setSender(message.getSender());
        log.setContent(message.getContent());
        log.setTimestamp(Instant.now());
        chatLogRepo.save(log);
        return message;
    }
}

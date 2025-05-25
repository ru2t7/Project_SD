package com.example.backend.controller;

import com.example.backend.entity.ChatLog;
import com.example.backend.repository.ChatLogRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chatlogs")
public class ChatLogController {
    private final ChatLogRepository repo;
    public ChatLogController(ChatLogRepository repo) { this.repo = repo; }
    @GetMapping
    public List<ChatLog> getAll() { return repo.findAll(); }
}

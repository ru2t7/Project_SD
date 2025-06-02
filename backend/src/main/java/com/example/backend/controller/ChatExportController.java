package com.example.backend.controller;

import com.example.backend.entity.ChatLog;
import com.example.backend.model.ChatLogList;
import com.example.backend.repository.ChatLogRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/chatlogs")
public class ChatExportController {

    private final ChatLogRepository repo;

    public ChatExportController(ChatLogRepository repo) {
        this.repo = repo;
    }

    @GetMapping(value = "/xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<ChatLogList> exportXml() {
        ChatLogList logs = new ChatLogList(repo.findAll());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"chatlogs.xml\"")
                .body(logs);
    }
}

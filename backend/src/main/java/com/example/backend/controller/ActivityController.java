package com.example.backend.controller;

import com.example.backend.entity.UserActivity;
import com.example.backend.repository.UserActivityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final UserActivityRepository repo;
    public ActivityController(UserActivityRepository repo) { this.repo = repo; }
    @GetMapping
    public List<UserActivity> getAll() { return repo.findAll(); }
}

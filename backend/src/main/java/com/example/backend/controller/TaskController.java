package com.example.backend.controller;

import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.service.TaskService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService,UserService userService) {
        this.taskService = taskService;
        this.userService = userService;

    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid  @RequestBody Task task) {
        if (task.getUser() != null && task.getUser().getId() != null) {
            User user = userService.findById(task.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setUser(user);
        }
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        if (task.getUser() != null && task.getUser().getId() != null) {
            User user = userService.findById(task.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setUser(user);
        }
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasksForUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.findByUserId(userId);
        return ResponseEntity.ok(tasks);
    }


}

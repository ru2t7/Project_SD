package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task) {
        task.setStatus(Task.TaskStatus.TO_DO); // default status
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setDeadline(updatedTask.getDeadline());
        existing.setStatus(updatedTask.getStatus());

        if (updatedTask.getUser() != null && updatedTask.getUser().getId() != null) {
            User user = userRepository.findById(updatedTask.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existing.setUser(user);
        } else {
            existing.setUser(null); // support unassigning
        }

        return taskRepository.save(existing);
    }


    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findByUserId(Long userId){
       return taskRepository.findByUserId(userId);
    }


}

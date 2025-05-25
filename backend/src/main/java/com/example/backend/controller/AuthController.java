package com.example.backend.controller;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

import com.example.backend.entity.UserActivity;
import com.example.backend.repository.UserActivityRepository;
import com.example.backend.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.User;
import com.example.backend.service.AuthService;

// DTO for login credentials
record LoginRequest(@NotBlank String username,   @NotBlank String password) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserActivityRepository activityRepo;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserActivityRepository activityRepo, UserRepository userRepository) {
        this.authService = authService;
        this.activityRepo = activityRepo;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest login) {
        Optional<User> userOpt = authService.authenticate(login.username(), login.password());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            activityRepo.save(new UserActivity(user, "LOGIN", Instant.now()));
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        activityRepo.save(new UserActivity(user, "LOGOUT", Instant.now()));
        return ResponseEntity.ok().build();
    }

}

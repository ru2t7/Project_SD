package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public User updateUser(Long id, User updatedData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedData.getUsername() != null) user.setUsername(updatedData.getUsername());
        if (updatedData.getEmail() != null) user.setEmail(updatedData.getEmail());
        if (updatedData.getPassword() != null) user.setPassword(updatedData.getPassword()); // plain text for now

        return userRepository.save(user);
    }

}

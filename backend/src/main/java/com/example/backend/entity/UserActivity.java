package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class UserActivity {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String action;           // “LOGIN” or “LOGOUT”
    private Instant timestamp;

    public UserActivity(User user, String action, Instant timestamp) {
        this.user=user;
        this.action=action;
        this.timestamp=timestamp;
    }

    public UserActivity() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}


package com.example.demo.responses;

import java.time.LocalDateTime;

public class MessageInfo implements Comparable<MessageInfo> {

    private long userId;
    private String message;
    private String username;
    private LocalDateTime timestamp;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public int compareTo(MessageInfo m) {
        if (getTimestamp() == null || m.getTimestamp() == null) {
            return 0;
        }
        return getTimestamp().compareTo(m.getTimestamp());
    }
}

package com.example.demo.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "MESSAGE")
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String recordIdentifier;
    private String type;
    private String messageContent;
    private  final LocalDateTime timestamp  = LocalDateTime.now();

    @Transient
    private List<Long>  receivers = new ArrayList<>();

    public Message() {
    }

    public Message(String messageContent, String type , String recordIdentifier) {
        this.messageContent = messageContent;
        this.type = type;
        this.recordIdentifier = recordIdentifier;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRecordIdentifier() {
        return recordIdentifier;
    }

    public void setRecordIdentifier(String recordIdentifier) {
        this.recordIdentifier = recordIdentifier;
    }

    public List<Long> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<Long> receivers) {
        this.receivers = receivers;
    }


    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", recordIdentifier='" + recordIdentifier + '\'' +
                ", type='" + type + '\'' +
                ", messageContent='" + messageContent + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}

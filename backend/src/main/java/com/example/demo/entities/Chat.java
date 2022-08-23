package com.example.demo.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "CHAT")
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany
    private List<Message> listOfMessages = new ArrayList<>();

    private String chatWith;

    public Chat(){
    }

    public Chat(List<Message> listOfMessages) {
        this.listOfMessages = listOfMessages;
    }

    public void addMessage(Message msg){
        listOfMessages.add(msg);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Message> getListOfMessages() {
        return listOfMessages;
    }

    public void setListOfMessages(List<Message> listOfMessages) {
        this.listOfMessages = listOfMessages;
    }

    public String getChatWith() {
        return chatWith;
    }

    public void setChatWith(String chatWith) {
        this.chatWith = chatWith;
    }

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", listOfMessages=" + listOfMessages +
                '}';
    }
}
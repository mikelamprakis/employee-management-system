package com.example.demo.controller;

import com.example.demo.entities.Chat;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/inbox/user/{id}")
    public ResponseEntity<List<Chat>> getInboxByUserId(@PathVariable Long id){
        User user = userRepository.findById(id).get();
        List<Chat> inbox = user.getListOfChats();
        return ResponseEntity.ok(inbox);
    }

    @PostMapping("/user/chat/create/{userId}")
    public ResponseEntity<Message> initiateChat(
            @PathVariable("userId") Long userId,
            @RequestBody Message message
    ){
        User sender = userRepository.findById(userId).get();
        messageRepository.save(message);
        sender.addMessageToOutbounds(message);

        Chat newChat = new Chat();
        String chatWith = message.getReceivers().size() >1 ? "GROUP_CHAT" : sender.getUserName() + " - " + userRepository.findById(message.getReceivers().get(0)).get().getUserName();
        newChat.setChatWith(chatWith);
        newChat.addMessage(message);
        chatRepository.save(newChat);

        sender.addChat(newChat);
        userRepository.save(sender);

        for (Long receiverId : message.getReceivers()){
            User receiver = userRepository.findById(receiverId).get();
            receiver.addChat(newChat);
            userRepository.save(receiver);
        }
       return ResponseEntity.ok(message);
    }


    @PostMapping("/user/chat/send/{userId}/{chatId}")
    public ResponseEntity<Message> sendMessageToChat(
            @PathVariable("userId") Long userId,
            @PathVariable("chatId") Long chatId,
            @RequestBody Message message
    ){
        messageRepository.save(message);

        Chat chatFromDb = chatRepository.findById(chatId).get();
        chatFromDb.addMessage(message);
        chatRepository.save(chatFromDb);

        User sender = userRepository.findById(userId).get();
        sender.addMessageToOutbounds(message);
        userRepository.save(sender);

        return ResponseEntity.ok(message);
    }






}
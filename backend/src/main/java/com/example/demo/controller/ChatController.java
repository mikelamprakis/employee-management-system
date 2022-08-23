package com.example.demo.controller;

import com.example.demo.entities.Chat;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.responses.MessageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ChatController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/users/chats/{chatId}")
    public List<User> getUsersByChatId(@PathVariable("chatId") Long chatId){
        return  userRepository.findUsersByChatId(chatId);
    }

    @GetMapping("/user/chat/{chatId}")
    public ResponseEntity<List<MessageInfo>>  getChatByChatId(
            @PathVariable("chatId") Long chatId
    ){
        List<MessageInfo> chatMessages = new ArrayList<>();

        List<User> chatUsers = userRepository.findUsersByChatId(chatId);
        Chat chatFromDb = chatRepository.findById(chatId).get();

        for (Message msg : chatFromDb.getListOfMessages()){
            MessageInfo msgInfo = new MessageInfo();
            msgInfo.setMessage(msg.getMessageContent());
            msgInfo.setTimestamp(msg.getTimestamp());

           for (User chatUser : chatUsers){
               if (chatUser.getListOfOutboundMessages().contains(msg)){
                   msgInfo.setUserId(chatUser.getId());
                   msgInfo.setUsername(chatUser.getUserName());
               }
           }

            chatMessages.add(msgInfo);
        }

        List<MessageInfo> chatMessagesSortedByTimestamp = chatMessages.stream()
                .sorted(Comparator.comparing(MessageInfo::getTimestamp))
                .collect(Collectors.toList());

        return ResponseEntity.ok(chatMessagesSortedByTimestamp);
    }

}

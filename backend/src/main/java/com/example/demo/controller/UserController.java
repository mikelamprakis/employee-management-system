package com.example.demo.controller;

import com.example.demo.ResourceNotFoundException;
import com.example.demo.entities.Authority;
import com.example.demo.entities.Chat;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;

    public User system;

    @Bean
    public void generateSystemUser(){
        system = new User("SYSTEM", "");
        userRepository.save(system);
    }

    @PostMapping("/create/user")
    public User createUser(@RequestBody User user){
        List<Authority> authorityList = new ArrayList<>();
        authorityList.add(createAuthority("USER", "User role"));
        user.setAuthorities(authorityList);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Message welcomeMsg = new Message("Welcome " + user.getUserName(), "INBOUND" , "");
        messageRepository.save(welcomeMsg);
        Chat firstChat = new Chat();
        firstChat.setChatWith("SYSTEM");
        firstChat.getListOfMessages().add(welcomeMsg);
        chatRepository.save(firstChat);
        user.addChat(firstChat);

        return userRepository.save(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User with id :" + id + "does not exist"));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/users/edit/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestBody User userDetails){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User with id : " + id + " does not exist"));

        if (userDetails.getUserName() != ""){
            user.setUserName(userDetails.getUserName());
        }

        if (userDetails.getPassword() != ""){
            user.setPassword(userDetails.getPassword());
        }
        if (userDetails.getFirstName() != ""){
            user.setFirstName(userDetails.getFirstName());
        }
        if (userDetails.getLastName() != ""){
            user.setLastName(userDetails.getLastName());
        }
        if (userDetails.getEmail() != ""){
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPhoneNumber() != ""){
            user.setPhoneNumber(userDetails.getPhoneNumber());
        }

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    private Authority createAuthority(String roleCode, String roleDescription){
        Authority authority = new Authority();
        authority.setRoleCode(roleCode);
        authority.setRoleDescription(roleDescription);
        return authority;
    }










}

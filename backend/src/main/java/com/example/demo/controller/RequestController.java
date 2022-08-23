package com.example.demo.controller;

import com.example.demo.entities.Request;
import com.example.demo.entities.User;
import com.example.demo.repository.RequestRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class RequestController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RequestRepository requestRepository;


    @GetMapping("/requests/all")
    public List<Request> getAllRequests(){
        return requestRepository.findAll();
    }

    @GetMapping("/requests/user/{userId}")
    public List<Request> getAllRequestsByUserId(@PathVariable("userId") long userid){
        return requestRepository.findRequestBuUserId(userid);
    }

    @PostMapping("/request/create/{userId}")
    public ResponseEntity<Request> createRequest(
            @PathVariable("userId") long userId,
            @RequestBody Request request
    ){
        User userFromDB = userRepository.findById(userId).get();
        request.setUser(userFromDB);
        requestRepository.save(request);

        return ResponseEntity.ok(request);
    }

    @PostMapping("/request/response/{requestId}")
    public ResponseEntity<Request> respondToRequest(
            @PathVariable("requestId") long requestId,
            @RequestBody Request statusUpdate
    ){
        Request requestFromDB = requestRepository.findById(requestId).get();
        requestFromDB.setStatus(statusUpdate.getStatus());
        requestRepository.save(requestFromDB);
        return ResponseEntity.ok(requestFromDB);
    }

}

package com.example.demo.controller;


import com.example.demo.config.JWTTokenHelper;
import com.example.demo.entities.User;
import com.example.demo.requests.AuthenticationRequest;
import com.example.demo.responses.LoginResponse;
import com.example.demo.responses.UserInfo;
import com.example.demo.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthenticationCotroller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper  jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomUserService customUserService;

    //get token
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwtToken = jwtTokenHelper.generateToken(user.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);
        return ResponseEntity.ok(response);
    }

    //get use through token
    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user){
        User userObj=(User) userDetailsService.loadUserByUsername(user.getName());

        UserInfo userInfo=new UserInfo();
        userInfo.setUserId(userObj.getId());
        userInfo.setFirstName(userObj.getFirstName());
        userInfo.setLastName(userObj.getLastName());
        userInfo.setUserName(userObj.getUserName());
        userInfo.setRoles(userObj.getAuthorities().toArray());
        userInfo.setChats(userObj.getListOfChats().toArray());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id){
        User user = (User) customUserService.loadUserById(id);
        return ResponseEntity.ok(user);
    }

}

package com.example.demo.service;

import com.example.demo.ResourceNotFoundException;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    UserRepository userDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDetailsRepository.findByUserName(username);
        if (user ==null){
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public UserDetails loadUserById(Long id){
        User user = userDetailsRepository.findById(id).get();
        if (user == null){
            throw new ResourceNotFoundException("Employee with id :" + id + "does not exist");
        }
        return user;
    }
}

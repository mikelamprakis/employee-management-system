package com.example.demo.repository;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);

    @Query("SELECT u FROM User u JOIN u.listOfChats chats WHERE chats.id = ?1")
    List<User> findUsersByChatId(Long chatId);
}

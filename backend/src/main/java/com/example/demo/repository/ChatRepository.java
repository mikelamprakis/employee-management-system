package com.example.demo.repository;

import com.example.demo.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository  extends JpaRepository<Chat, Long> {
}

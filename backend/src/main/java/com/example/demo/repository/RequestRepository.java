package com.example.demo.repository;

import com.example.demo.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query("SELECT u FROM Request u  WHERE user.id = ?1")
    List<Request> findRequestBuUserId  (Long userId);
}

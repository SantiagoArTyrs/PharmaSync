package com.pharmasync.backend.repository;

import com.pharmasync.backend.model.ChatSession;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChatSessionRepository extends MongoRepository<ChatSession, String> {
    ChatSession findBySessionId(String sessionId);
    List<ChatSession> findByUserId(String userId);
    void deleteByUserId(String userId);
}


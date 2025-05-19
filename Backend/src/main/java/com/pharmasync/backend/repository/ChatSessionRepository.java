package com.pharmasync.backend.repository;

import com.pharmasync.backend.model.ChatSession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatSessionRepository extends MongoRepository<ChatSession, String> {
}

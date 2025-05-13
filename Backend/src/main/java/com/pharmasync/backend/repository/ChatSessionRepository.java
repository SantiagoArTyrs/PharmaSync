package com.pharmasync.backend.repository;

import com.pharmasync.backend.model.ChatSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatSessionRepository extends MongoRepository<ChatSession, String> {

}

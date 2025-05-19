package com.pharmasync.backend.service;

import com.pharmasync.backend.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisChatService {

    private final RedisTemplate<String, ChatMessage> redisTemplate;

    private static final Duration TTL = Duration.ofMinutes(30);

    public void saveMessage(String sessionId, ChatMessage message) {
        String key = getKey(sessionId);
        redisTemplate.opsForList().rightPush(key, message);
        redisTemplate.expire(key, TTL);
    }

    public List<ChatMessage> getMessages(String sessionId) {
        String key = getKey(sessionId);
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void deleteSession(String sessionId) {
        redisTemplate.delete(getKey(sessionId));
    }

    private String getKey(String sessionId) {
        return "chat:" + sessionId;
    }
}

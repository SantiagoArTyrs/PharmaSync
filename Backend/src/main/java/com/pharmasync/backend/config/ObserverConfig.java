package com.pharmasync.backend.config;

import com.pharmasync.backend.patterns.observer.LoggingChatEventListener;
import com.pharmasync.backend.patterns.observer.MetricsChatEventListener;
import com.pharmasync.backend.service.ChatService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ObserverConfig {

    private final ChatService chatService;

    @PostConstruct
    public void registerListeners() {
        chatService.getListeners().add(new LoggingChatEventListener());
        chatService.getListeners().add(new MetricsChatEventListener());
    }
}
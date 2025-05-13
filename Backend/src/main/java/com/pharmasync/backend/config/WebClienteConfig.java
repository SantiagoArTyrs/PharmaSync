package com.pharmasync.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClienteConfig {


    @Bean
    public WebClient n8nWebClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:5678")  // ajusta host/puerto de tu n8n
                .build();
    }
}

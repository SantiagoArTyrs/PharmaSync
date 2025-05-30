package com.pharmasync.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponse {

    private String id;
    private String content;
    private boolean isUser;
    private String timestamp;
    private String sessionId;
}

package com.pharmasync.backend.dto;

import com.pharmasync.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private User user;
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}

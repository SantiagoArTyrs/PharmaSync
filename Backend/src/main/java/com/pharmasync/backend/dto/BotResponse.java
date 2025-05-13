package com.pharmasync.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BotResponse {

    private String replyText;
    private List<String> extractedAllergies;
    // Demas sintomas

}


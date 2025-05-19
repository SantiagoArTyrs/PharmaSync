package com.pharmasync.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BotResponse {

    private String replyText;
    @Builder.Default
    private List<String> extractedAllergies = new ArrayList<>();
    // Demas sintomas

}


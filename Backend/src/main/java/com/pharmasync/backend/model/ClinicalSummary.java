package com.pharmasync.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "clinical_summaries")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClinicalSummary {


    @Id
    private String id;

    private String userId;
    private String sessionId;
    private String question;
    private String answer;
    private String type;
    private LocalDateTime timestamp;

}

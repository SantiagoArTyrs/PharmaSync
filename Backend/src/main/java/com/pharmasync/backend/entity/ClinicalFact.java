package com.pharmasync.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clinical_facts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalFact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;
    private String term;        // ej: "Paracetamol"
    private String category;    // ej: "medication", "symptom", "condition"
}

package com.pharmasync.backend.repository;

import com.pharmasync.backend.entity.ClinicalFact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicalFactRepository extends JpaRepository<ClinicalFact, Long> {
}

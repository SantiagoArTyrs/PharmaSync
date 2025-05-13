package com.pharmasync.backend.repository;

import com.pharmasync.backend.entity.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SymptomRepository extends JpaRepository<Symptom, Long> {
    boolean existsByName(String name);
}

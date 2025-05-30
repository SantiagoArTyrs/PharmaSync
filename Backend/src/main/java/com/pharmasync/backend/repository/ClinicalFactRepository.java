package com.pharmasync.backend.repository;

import com.pharmasync.backend.entity.ClinicalFact;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ClinicalFactRepository extends JpaRepository<ClinicalFact, Long> {


}

package com.pharmasync.backend.repository;

import com.pharmasync.backend.model.ClinicalSummary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicalSummaryRepository extends MongoRepository<ClinicalSummary, String> {
    List<ClinicalSummary> findByUserId(String userId);

    List<ClinicalSummary> findBySessionId(String sessionId);

    List<ClinicalSummary> findByType(String type);
}

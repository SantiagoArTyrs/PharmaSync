package com.pharmasync.backend.repository;

import com.pharmasync.backend.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugRepository extends JpaRepository<Drug, Long> {
}

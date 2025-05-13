package com.pharmasync.backend.service;

import com.pharmasync.backend.entity.Drug;
import com.pharmasync.backend.repository.DrugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugService {

    private final DrugRepository drugRepository;

    public List<Drug> findAll() {
        return drugRepository.findAll();
    }

    public Drug save(Drug drug) {
        return drugRepository.save(drug);
    }
}
package com.pharmasync.backend.service;

import com.pharmasync.backend.entity.Symptom;
import com.pharmasync.backend.repository.SymptomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SymptomService {

    private final SymptomRepository symptomRepository;

    public List<Symptom> findAll() {
        return symptomRepository.findAll();
    }

    public Symptom save(Symptom symptom) {
        return symptomRepository.save(symptom);
    }

    public boolean existsByName(String name) {
        return symptomRepository.existsByName(name);
    }
    /*
    public Optional<Symptom> findById(Long id) {
    return symptomRepository.findById(id);
}

public void deleteById(Long id) {
    symptomRepository.deleteById(id);
}

     */
}

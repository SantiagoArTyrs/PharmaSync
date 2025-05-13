package com.pharmasync.backend.service;


import com.pharmasync.backend.entity.Prescription;
import com.pharmasync.backend.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public List<Prescription> findAll() {
        return prescriptionRepository.findAll();
    }

    public List<Prescription> findByUserId(Long userId) {
        return prescriptionRepository.findByUserId(userId);
    }

    public Prescription save(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }
}

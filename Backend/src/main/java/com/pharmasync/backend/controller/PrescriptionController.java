package com.pharmasync.backend.controller;

import com.pharmasync.backend.entity.Prescription;
import com.pharmasync.backend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    public ResponseEntity<Prescription> create(@RequestBody Prescription p) {
        Prescription saved = prescriptionService.save(p);
        return ResponseEntity
                .created(URI.create("/api/prescriptions/" + saved.getId()))
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getAll() {
        return ResponseEntity.ok(prescriptionService.findAll());
    }
/*
    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getById(@PathVariable Long id) {
        Optional<Prescription> p = prescriptionService.findById(id);
        return p.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @RequestBody Prescription dto) {
        return prescriptionService.findById(id)
                .map(existing -> {
                    existing.setDate(dto.getDate());
                    existing.setRecommendationNotes(dto.getRecommendationNotes());
                    existing.setSymptoms(dto.getSymptoms());
                    existing.setDrugs(dto.getDrugs());
                    Prescription updated = prescriptionService.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return prescriptionService.findById(id)
                .map(p -> {
                    prescriptionService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

 */
}

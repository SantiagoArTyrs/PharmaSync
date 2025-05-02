package com.pharmasync.backend.controller;


import com.pharmasync.backend.entity.Symptom;
import com.pharmasync.backend.repository.SymptomRepository;
import lombok.RequiredArgsConstructor;
import com.pharmasync.backend.service.SymptomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/symptoms")
@RequiredArgsConstructor
public class SymptomController {
    private final SymptomService symptomService;

    @PostMapping
    public ResponseEntity<Symptom> create(@RequestBody Symptom symptom) {
        if (symptomService.existsByName(symptom.getName())) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        Symptom saved = symptomService.save(symptom);
        // Location header apuntando al nuevo recurso
        return ResponseEntity
                .created(URI.create("/api/symptoms/" + saved.getId()))
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Symptom>> getAll() {
        List<Symptom> list = symptomService.findAll();
        return ResponseEntity.ok(list);
    }
    /*
    @GetMapping("/{id}")
    public ResponseEntity<Symptom> getById(@PathVariable Long id) {
        Optional<Symptom> symOpt = symptomService.findById(id);
        return symOpt
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Symptom> update(@PathVariable Long id,
                                          @RequestBody Symptom dto) {
        Optional<Symptom> existingOpt = symptomService.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Symptom existing = existingOpt.get();
        existing.setName(dto.getName());
        Symptom updated = symptomService.save(existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Symptom> existingOpt = symptomService.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        symptomService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

     */
}

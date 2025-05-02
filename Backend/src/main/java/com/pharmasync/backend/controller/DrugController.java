package com.pharmasync.backend.controller;
import com.pharmasync.backend.entity.Drug;
import com.pharmasync.backend.service.DrugService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/drugs")
@RequiredArgsConstructor
public class DrugController {

    private final DrugService drugService;

    @PostMapping
    public ResponseEntity<Drug> create(@RequestBody Drug drug) {
        Drug saved = drugService.save(drug);
        return ResponseEntity
                .created(URI.create("/api/drugs/" + saved.getId()))
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Drug>> getAll() {
        return ResponseEntity.ok(drugService.findAll());
    }

    /*
    @GetMapping("/{id}")
    public ResponseEntity<Drug> getById(@PathVariable Long id) {
        Optional<Drug> d = drugService.findById(id);
        return d.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Drug> update(@PathVariable Long id, @RequestBody Drug dto) {
        return drugService.findById(id)
                .map(existing -> {
                    existing.setName(dto.getName());
                    existing.setDescription(dto.getDescription());
                    Drug updated = drugService.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return drugService.findById(id)
                .map(d -> {
                    drugService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
     }
    */
}
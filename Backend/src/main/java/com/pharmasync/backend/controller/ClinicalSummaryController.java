package com.pharmasync.backend.controller;


import com.pharmasync.backend.entity.User;
import com.pharmasync.backend.model.ClinicalSummary;
import com.pharmasync.backend.service.ClinicalSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/summary")
@RequiredArgsConstructor
public class ClinicalSummaryController {

    private final ClinicalSummaryService clinicalSummaryService;

    @GetMapping("/all")
    public ResponseEntity<List<ClinicalSummary>> getSummariesForUserOrAdmin(@AuthenticationPrincipal User user) {
        boolean isAdmin = user.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            // Admin can see all summaries
            return ResponseEntity.ok(clinicalSummaryService.getAllSummaries());
        } else {
            // Normal users only see their own summaries
            return ResponseEntity.ok(clinicalSummaryService.getSummariesByUser(String.valueOf(user.getId())));
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ClinicalSummary>> getSummariesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(clinicalSummaryService.getSummariesByUser(userId));
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<ClinicalSummary>> getSummariesBySession(@PathVariable String sessionId) {
        return ResponseEntity.ok(clinicalSummaryService.getSummariesBySession(sessionId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ClinicalSummary>> getSummariesByType(@PathVariable String type) {
        return ResponseEntity.ok(clinicalSummaryService.getSummariesByType(type));
    }
}

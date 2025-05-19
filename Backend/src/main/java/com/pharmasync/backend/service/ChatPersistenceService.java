package com.pharmasync.backend.service;

import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.model.ChatSession;
import com.pharmasync.backend.entity.ClinicalFact;
import com.pharmasync.backend.repository.ChatSessionRepository;
import com.pharmasync.backend.repository.ClinicalFactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatPersistenceService {

    private final ChatSessionRepository chatSessionRepository;
    private final ClinicalFactRepository clinicalFactRepository;

    public void persistSession(String sessionId, List<ChatMessage> history) {
        // 1. Guardar historial completo en Mongo
        ChatSession session = ChatSession.builder()
                .sessionId(sessionId)
                .messages(history)
                .build();
        chatSessionRepository.save(session);
        log.info("Sesión {} guardada en MongoDB", sessionId);

        // 2. Extraer términos clínicos del historial
        List<ClinicalFact> facts = extractClinicalFacts(sessionId, history);
        clinicalFactRepository.saveAll(facts);
        log.info("Se guardaron {} términos clínicos en PostgreSQL", facts.size());
    }

    private List<ClinicalFact> extractClinicalFacts(String sessionId, List<ChatMessage> history) {
        List<ClinicalFact> facts = new ArrayList<>();

        for (ChatMessage msg : history) {
            String content = msg.getContent().toLowerCase();

            if (content.contains("paracetamol"))
                facts.add(newFact(sessionId, "Paracetamol", "medication"));
            if (content.contains("ibuprofeno"))
                facts.add(newFact(sessionId, "Ibuprofeno", "medication"));
            if (content.contains("dolor de cabeza"))
                facts.add(newFact(sessionId, "Dolor de cabeza", "symptom"));
            if (content.contains("gripe"))
                facts.add(newFact(sessionId, "Gripe", "condition"));
            // Agrega más reglas o usa NLP si quieres automatizar más
        }

        return facts;
    }

    private ClinicalFact newFact(String sessionId, String term, String category) {
        return ClinicalFact.builder()
                .sessionId(sessionId)
                .term(term)
                .category(category)
                .build();
    }
}

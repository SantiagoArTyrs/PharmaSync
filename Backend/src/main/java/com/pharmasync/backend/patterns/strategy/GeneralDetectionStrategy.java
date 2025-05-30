package com.pharmasync.backend.patterns.strategy;

import org.springframework.stereotype.Component;
import opennlp.tools.stemmer.PorterStemmer;
import opennlp.tools.tokenize.SimpleTokenizer;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GeneralDetectionStrategy implements SummaryDetectionStrategy {

    private static final String[] medicalTerms = {
            "dolor", "fiebre", "síntoma", "enfermedad", "medicamento", "tratamiento",
            "infección", "virus", "bacteria", "antibiótico", "dosis", "interacción",
            "alergia", "reacción", "síndrome"
    };

    @Override
    public boolean isRelevant(String message) {
        return containsMedicalTermsNLP(message);
    }

    private boolean containsMedicalTermsNLP(String message) {
        if (message == null) return false;

        PorterStemmer stemmer = new PorterStemmer();
        SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE;

        Set<String> stemmedTerms = Arrays.stream(medicalTerms)
                .map(stemmer::stem)
                .collect(Collectors.toSet());

        String[] tokens = tokenizer.tokenize(message.toLowerCase());

        for (String token : tokens) {
            String stemmedToken = stemmer.stem(token);
            if (stemmedTerms.contains(stemmedToken)) {
                return true;
            }
        }
        return false;
    }
    @Override
    public boolean matches(String message) {
        return true;
    }

    @Override
    public String getType() {
        return "general";
    }

    @Override
    public String processAnswer(String rawAnswer) {
        if (rawAnswer == null || rawAnswer.isEmpty()) {
            return "";
        }
        return rawAnswer;
    }
}

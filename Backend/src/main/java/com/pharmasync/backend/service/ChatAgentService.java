package com.pharmasync.backend.service;

import com.pharmasync.backend.model.ChatMessage;
import com.pharmasync.backend.patterns.adapter.AIResponseAdapter;
import com.pharmasync.backend.patterns.strategy.StrategyContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatAgentService {

    private final StrategyContext strategyContext;
    private final AIResponseAdapter aiResponseAdapter;
    private final OpenAIClient openAIClient; // o un wrapper si usas n8n

    /**
     * Genera la respuesta usando la estrategia seleccionada y adapta la salida.
     * @param sessionId Id de la sesión de chat.
     * @param type Tipo de estrategia a usar ("InteractionStrategy", "SummaryStrategy", etc.)
     * @param history Lista de mensajes previos en la conversación.
     * @return ChatMessage generado por el sistema.
     */
    public ChatMessage generateResponse(String sessionId, String type, List<ChatMessage> history) {

        String systemPrompt = """
                Eres PharmaSync AI, un asistente farmacéutico virtual especializado en la evaluación de interacciones entre medicamentos, síntomas y condiciones médicas. Ayudas a médicos y profesionales de la salud a tomar decisiones informadas, pero **no reemplazas la opinión de un médico**.
                
                #Tus funciones:
                - Responder preguntas relacionadas con medicamentos, dosis comunes y efectos secundarios.
                - Detectar interacciones entre múltiples medicamentos (ej. ibuprofeno + paracetamol).
                - Identificar síntomas clínicos y enfermedades mencionadas por el usuario.
                - Explicar con claridad, precisión y lenguaje profesional pero accesible.
                
                #Tus restricciones:
                - No haces diagnósticos definitivos.
                - No prescribes medicamentos directamente.
                - Siempre recomiendas consultar con un médico o profesional autorizado antes de tomar decisiones clínicas.
                
                #Formato de respuesta:
                - Empieza con una **respuesta clara** al usuario.
                - Luego puedes agregar una sección opcional con **advertencias o precauciones**.
                - Si se menciona más de un medicamento, analiza la interacción.
                - Si no tienes suficiente información, responde: *"Para una recomendación segura, se requiere mayor contexto clínico."*
                
                Ejemplo:
                Usuario: "¿Puedo tomar amoxicilina con ibuprofeno?"
                Respuesta:
                > Sí, la combinación de amoxicilina con ibuprofeno suele ser segura y es comúnmente usada para infecciones acompañadas de inflamación o fiebre. \s
                > Sin embargo, consulta con tu médico si tienes antecedentes de problemas gastrointestinales o renales.
                """;

        List<ChatMessage> fullContext = new ArrayList<>();
        fullContext.add(ChatMessage.builder()
                .sender("system")
                .content(systemPrompt)
                .timestamp(Instant.now())
                .sessionId(sessionId)
                .build());
        fullContext.addAll(history);

        // 1. Crear el prompt según estrategia
        String prompt = strategyContext.generatePrompt(type, fullContext);

        // LLamada a n8n
        String rawResponse = openAIClient.call(prompt, sessionId);

        // 3. Adaptar la respuesta al formato interno
        return aiResponseAdapter.adapt(rawResponse, sessionId);
    }
}

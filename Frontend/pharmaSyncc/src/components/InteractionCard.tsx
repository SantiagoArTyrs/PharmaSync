// src/components/InteractionCard.tsx
import React from 'react';

export interface Interaction {
  id: string;
  drugs: string;        // e.g. "Aspirina e Ibuprofeno"
  description: string;  // breve descripción de la interacción
}

interface InteractionCardProps {
  interaction: Interaction;
}

const InteractionCard: React.FC<InteractionCardProps> = ({ interaction }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{interaction.drugs}</h3>
      <p className="text-gray-600 text-sm">{interaction.description}</p>
    </div>
  );
};

export default InteractionCard;

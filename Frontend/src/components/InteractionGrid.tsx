// src/components/InteractionGrid.tsx
import React from 'react';
import InteractionCard, { Interaction } from './InteractionCard';

interface InteractionGridProps {
  items: Interaction[];
}

const InteractionGrid: React.FC<InteractionGridProps> = ({ items }) => {
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <InteractionCard key={item.id} interaction={item} />
        ))}
      </div>
    </section>
  );
};

export default InteractionGrid;

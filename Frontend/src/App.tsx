import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import InteractionGrid from './components/InteractionGrid';
import ChatPanel from './components/ChatPanel';
import { Interaction } from './components/InteractionCard';

const sampleData: Interaction[] = [
  { id: '1', drugs: 'Aspirina e Ibuprofeno', description: 'Puede aumentar riesgo de sangrado gastrointestinal.' },
  { id: '2', drugs: 'Lisinopril y Atorvastatina', description: 'No se reportan interacciones significativas.' },
  { id: '3', drugs: 'Metformina y Simvastatina', description: 'Riesgo leve de hipoglucemia.' },
];

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = sampleData.filter(item =>
    item.drugs.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Body layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search */}
            <SearchBar value={query} onChange={setQuery} />

            {/* Título */}
            <h2 className="text-2xl font-semibold">Interacciones recientes</h2>

            {/* Grid de tarjetas */}
            <InteractionGrid items={filtered} />
          </div>
        </main>

        {/* Chat lateral derecho */}
        <aside className="w-80 bg-white border-l border-gray-200 shadow-lg flex flex-col">
          <ChatPanel />
        </aside>
      </div>
    </div>
  );
};

export default App;

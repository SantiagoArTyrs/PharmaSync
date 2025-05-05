// src/components/ChatPanel.tsx
import React, { useState, KeyboardEvent } from 'react';
import { FiSend } from 'react-icons/fi';

type Message = { sender: 'user' | 'bot'; text: string };

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Esta es una respuesta de prueba.' },
      ]);
    }, 500);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-l-2xl shadow-inner overflow-hidden">
      {/* Encabezado */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Asistente</h2>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 text-sm rounded-xl ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center bg-white rounded-full shadow-sm px-3 py-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 outline-none bg-transparent text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            onClick={send}
            className="ml-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full"
          >
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

// src/components/SearchBar.tsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center bg-white rounded-md shadow px-4 py-2 max-w-2xl mx-auto mt-6">
      <FiSearch className="text-gray-400 mr-3" size={20} />
      <input
        type="text"
        placeholder="Consultar interacciones entre medicamentos"
        className="flex-grow focus:outline-none text-gray-700"
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

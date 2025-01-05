import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isSelected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
        transition-colors whitespace-nowrap
        ${isSelected 
          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {label}
      {isSelected && <X className="w-3 h-3" />}
    </button>
  );
}
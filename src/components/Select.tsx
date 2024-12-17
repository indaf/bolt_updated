import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface SelectProps {
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
}

export function Select({ label, options, value, onChange, tooltip }: SelectProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-300"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute z-10 w-64 p-2 text-sm bg-[#CEBABE] text-black font-bold rounded-md 
                            shadow-lg -right-2 top-6">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#2C2C2C] border border-gray-700 rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#DC002B] focus:border-transparent
                   hover:border-gray-600 transition-colors duration-200"
      >
        <option value="">Sélectionner...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
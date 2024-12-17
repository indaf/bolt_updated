import React from 'react';
import { HelpCircle } from 'lucide-react';

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
}

export function CheckboxGroup({ label, options, value, onChange, tooltip }: CheckboxGroupProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

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
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 p-2 rounded-lg bg-[#2C2C2C] border border-gray-700 
                     hover:border-gray-600 transition-colors duration-200 cursor-pointer"
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-[#DC002B] bg-gray-700 border-gray-600 focus:ring-[#DC002B]
                       rounded-full cursor-pointer"
            />
            <span className="text-sm text-gray-300">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
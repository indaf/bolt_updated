import React from 'react';
import { HelpCircle } from 'lucide-react';
import { DifficultyIndicator } from './DifficultyIndicator';

interface RadioGroupProps {
  label: string;
  options: { value: string; label: string; description?: string; difficulty: number }[];
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
}

export function RadioGroup({ label, options, value, onChange, tooltip }: RadioGroupProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  const selectedDifficulty = options.find(opt => opt.value === value)?.difficulty || 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-[15px] font-medium text-gray-300">{label}</label>
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
        <DifficultyIndicator difficulty={selectedDifficulty} />
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              relative flex items-center p-3 rounded-lg cursor-pointer
              transition-all duration-200 ease-in-out
              ${value === option.value 
                ? 'bg-[#2C2C2C] border border-[#009B70]' 
                : 'bg-[#2C2C2C] border border-gray-700 hover:border-gray-600'}
            `}
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span className={`
              w-4 h-4 rounded-full border mr-3 flex items-center justify-center
              ${value === option.value 
                ? 'border-[#009B70] bg-[#009B70]' 
                : 'border-gray-600 bg-transparent'}
            `}>
              {value === option.value && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            <span className="text-sm text-gray-300">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
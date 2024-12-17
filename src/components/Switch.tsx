import React from 'react';
import { HelpCircle } from 'lucide-react';
import { DifficultyIndicator } from './DifficultyIndicator';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tooltip?: string;
}

export function Switch({ label, checked, onChange, tooltip }: SwitchProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  const difficulty = checked ? 1 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-gray-300">{label}</span>
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
        <DifficultyIndicator difficulty={difficulty} />
      </div>
      <div className={`
        flex items-center justify-between p-3 rounded-lg
        transition-all duration-200 ease-in-out h-[46px]
        ${checked ? 'border border-[#009B70]' : 'border border-gray-700 hover:border-gray-600'}
      `}>
        <span className="text-sm text-gray-300">Activer</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 rounded-full peer 
                        peer-focus:ring-1 peer-focus:ring-[#009B70]
                        peer-checked:after:translate-x-full peer-checked:bg-[#009B70]
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:rounded-full after:h-5 after:w-5
                        after:transition-all
                        bg-gray-700">
          </div>
        </label>
      </div>
    </div>
  );
}
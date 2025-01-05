import React from 'react';
import { RefreshCw, Play } from 'lucide-react';

interface TempoControlsProps {
  onReset: () => void;
  onStart: () => void;
  disabled?: boolean;
}

export const TempoControls: React.FC<TempoControlsProps> = ({
  onReset,
  onStart,
  disabled
}) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onReset}
        disabled={disabled}
        className="px-6 py-2 bg-[#343541] text-white rounded-lg
                 hover:bg-[#3E3F4B] transition-colors disabled:opacity-50
                 flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Recommencer
      </button>

      <button
        onClick={onStart}
        disabled={disabled}
        className="px-6 py-2 bg-[#009B70] text-white rounded-lg
                 hover:bg-[#007B56] transition-colors disabled:opacity-50
                 flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        Commencer
      </button>
    </div>
  );
};
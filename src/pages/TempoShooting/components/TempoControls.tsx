import React from 'react';
import { TempoSettings } from '../types';

interface TempoControlsProps {
  settings: TempoSettings;
  onSettingsChange: (settings: TempoSettings) => void;
  disabled?: boolean;
}

export function TempoControls({ settings, onSettingsChange, disabled }: TempoControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-1">Tempo (BPM)</label>
        <input
          type="range"
          min="30"
          max="350"
          step="5"
          value={settings.initialTempo}
          onChange={(e) => onSettingsChange({
            ...settings,
            initialTempo: parseInt(e.target.value)
          })}
          disabled={disabled}
          className="w-full accent-[#009B70]"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>30</span>
          <span>{settings.initialTempo}</span>
          <span>350</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { TempoStatus as Status } from '../../types';

interface TempoStatusProps {
  status: Status;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const TempoStatus: React.FC<TempoStatusProps> = ({
  status,
  isSoundEnabled,
  onToggleSound
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-medium text-white">
        {status === 'playing' && 'Suivez le rythme !'}
        {status === 'waiting' && 'Prêt à commencer'}
        {status === 'failed' && 'Essayez encore !'}
        {status === 'finished' && 'Bien joué !'}
      </div>

      <button
        onClick={onToggleSound}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        {isSoundEnabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
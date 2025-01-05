import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Exercise } from '../../types/Exercise';

interface ModalHeaderProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ModalHeader({ exercise, onClose }: ModalHeaderProps) {
  return (
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {exercise.module.difficulty} • {exercise.weapon.type}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => console.log('Download')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Télécharger"
        >
          <Download className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={() => window.print()}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Imprimer"
        >
          <Printer className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg ml-2"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Download, Printer, X } from 'lucide-react';

interface ExerciseHeaderProps {
  title: string;
  onClose: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

export function ExerciseHeader({ title, onClose, onDownload, onPrint }: ExerciseHeaderProps) {
  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 border-b border-gray-100 flex items-center justify-between z-10">
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onDownload}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Télécharger la fiche"
        >
          <Download className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={onPrint}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Imprimer la fiche"
        >
          <Printer className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
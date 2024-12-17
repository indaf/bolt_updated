import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddShooterModal } from './AddShooterModal';

export function AddShooterButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors whitespace-nowrap flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Ajouter un tireur
      </button>

      <AddShooterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
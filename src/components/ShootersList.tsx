import React, { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { useShooterStore } from '../store/shooterStore';
import { AddShooterModal } from './AddShooterModal';
import { EditShooterModal } from './EditShooterModal';

export function ShootersList() {
  const shooters = useShooterStore((state) => state.shooters);
  const selectedShooterId = useShooterStore((state) => state.selectedShooterId);
  const setSelectedShooter = useShooterStore((state) => state.setSelectedShooter);
  const [editingShooter, setEditingShooter] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Ajouter un tireur
        </button>
        
        <div className="flex flex-wrap gap-2">
          {shooters.map((shooter) => (
            <div key={shooter.id} className="flex items-center">
              <button
                onClick={() => setSelectedShooter(shooter.id)}
                className={`
                  group px-4 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2
                  ${selectedShooterId === shooter.id
                    ? 'bg-[#009B70] text-white border border-[#009B70]'
                    : 'text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                  }
                `}
              >
                <span className="truncate max-w-[120px] md:max-w-none">
                  {shooter.firstName} {shooter.lastName}
                </span>
                <MoreVertical 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingShooter(shooter.id);
                  }}
                  className={`
                    w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
                    ${selectedShooterId === shooter.id ? 'text-white' : 'text-gray-400'}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AddShooterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {editingShooter && (
        <EditShooterModal
          shooterId={editingShooter}
          onClose={() => setEditingShooter(null)}
        />
      )}
    </>
  );
}
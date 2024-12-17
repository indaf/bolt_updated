import React, { useState, useEffect } from 'react';
import { X, Trash2, User, Hash } from 'lucide-react';
import { useShooterStore } from '../store/shooterStore';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

interface EditShooterModalProps {
  shooterId: string;
  onClose: () => void;
}

export function EditShooterModal({ shooterId, onClose }: EditShooterModalProps) {
  const { shooters, updateShooter, removeShooter } = useShooterStore();
  const shooter = shooters.find(s => s.id === shooterId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    uniqueId: '',
  });

  useEffect(() => {
    if (shooter) {
      setFormData({
        firstName: shooter.firstName || '',
        lastName: shooter.lastName || '',
        birthDate: shooter.birthDate || '',
        birthPlace: shooter.birthPlace || '',
        uniqueId: shooter.uniqueId || '',
      });
    }
  }, [shooter]);

  if (!shooter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateShooter(shooterId, formData);
    onClose();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    removeShooter(shooterId);
    setIsDeleteModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold text-white mb-6">Modifier le tireur</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Identifiant unique
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.uniqueId}
                  onChange={(e) => setFormData(prev => ({ ...prev, uniqueId: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date de naissance
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Lieu de naissance
              </label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData(prev => ({ ...prev, birthPlace: e.target.value }))}
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                           hover:bg-[#007B56] transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        shooterName={`${shooter.firstName} ${shooter.lastName}`}
      />
    </>
  );
}
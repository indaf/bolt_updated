import React, { useState } from 'react';
import { X, User, Hash, Search } from 'lucide-react';
import { useShooterStore } from '../store/shooterStore';

interface AddShooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddShooterModal({ isOpen, onClose }: AddShooterModalProps) {
  const shooters = useShooterStore((state) => state.shooters);
  const addShooter = useShooterStore((state) => state.addShooter);
  const setSelectedShooter = useShooterStore((state) => state.setSelectedShooter);
  const [mode, setMode] = useState<'search' | 'create'>('search');
  const [searchId, setSearchId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const shooter = shooters.find(s => s.uniqueId === searchId);
    if (shooter) {
      setSelectedShooter(shooter.id);
      onClose();
    } else {
      alert("Aucun tireur trouvé avec cet identifiant. Veuillez vérifier l'identifiant ou créer un nouveau tireur.");
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newShooter = addShooter(formData);
    setSelectedShooter(newShooter.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Ajouter un tireur</h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('search')}
            className={`
              flex-1 py-2 rounded-lg transition-colors
              ${mode === 'search'
                ? 'bg-[#009B70] text-white'
                : 'bg-[#2A2B32] text-gray-400 hover:text-white'
              }
            `}
          >
            Rechercher un tireur
          </button>
          <button
            onClick={() => setMode('create')}
            className={`
              flex-1 py-2 rounded-lg transition-colors
              ${mode === 'create'
                ? 'bg-[#009B70] text-white'
                : 'bg-[#2A2B32] text-gray-400 hover:text-white'
              }
            `}
          >
            Créer un tireur
          </button>
        </div>

        {mode === 'search' ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Identifiant du tireur
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="@prenomnom"
                  className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Entrez l'identifiant unique du tireur (@prenomnom)
              </p>
            </div>

            <div className="flex justify-end gap-3">
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
                         hover:bg-[#007B56] transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Rechercher
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
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

            <div className="flex justify-end gap-3">
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
                Créer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
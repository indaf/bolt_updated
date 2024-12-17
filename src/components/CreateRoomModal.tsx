import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { RoomCategory } from '../types/chat';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: RoomCategory;
}

export function CreateRoomModal({ isOpen, onClose, initialCategory }: CreateRoomModalProps) {
  const { user } = useAuthStore();
  const createRoom = useChatStore((state) => state.createRoom);
  const [formData, setFormData] = useState({
    name: '',
    category: initialCategory,
    isPrivate: false,
    password: ''
  });

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createRoom({
      name: formData.name,
      category: formData.category,
      isPrivate: formData.isPrivate,
      password: formData.isPrivate && formData.password.trim() ? formData.password : undefined,
      createdBy: user.id,
      createdAt: Date.now(),
      participants: [user.id]
    });

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

        <h2 className="text-xl font-semibold text-white mb-6">
          Créer un salon {formData.category === 'instructor' ? 'instructeur' : 'public'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nom du salon
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
              className="rounded border-gray-700 text-[#009B70] focus:ring-[#009B70]"
            />
            <label htmlFor="isPrivate" className="text-sm text-gray-300">
              Salon privé
            </label>
          </div>

          {formData.isPrivate && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Code d'accès (optionnel)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  placeholder="Laissez vide pour un accès sans code"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {formData.category === 'instructor' 
                  ? "Le salon sera visible uniquement par les instructeurs. Un code d'accès est optionnel."
                  : "Un code d'accès permettra de restreindre l'accès au salon."}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
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
      </div>
    </div>
  );
}
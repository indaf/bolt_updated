import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string | null;
}

export function JoinRoomModal({ isOpen, onClose, roomId }: JoinRoomModalProps) {
  const { user } = useAuthStore();
  const { rooms, joinRoom, setSelectedRoom } = useChatStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !user || !roomId) return null;

  const room = rooms.find(r => r.id === roomId);
  if (!room) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = joinRoom(roomId, user.id, password);
    if (success) {
      setSelectedRoom(roomId);
      onClose();
    } else {
      setError('Code d\'accès incorrect');
    }
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
          Rejoindre {room.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Code d'accès
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
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
              Rejoindre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
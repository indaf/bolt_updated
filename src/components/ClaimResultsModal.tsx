import React, { useState } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';
import { useResultStore } from '../store/resultStore';
import { useAuthStore } from '../store/authStore';

interface ClaimResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClaimResultsModal({ isOpen, onClose }: ClaimResultsModalProps) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuthStore();
  const claimResults = useResultStore((state) => state.claimResults);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const results = claimResults(key, user.id);
    
    if (results.length === 0) {
      setError('La clé entrée est invalide ou ne correspond pas à vos informations. Veuillez vérifier et réessayer.');
      return;
    }

    setSuccess(`${results.length} résultat(s) ont été récupérés avec succès !`);
    setKey('');
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

        <h2 className="text-xl font-semibold text-white mb-6">Récupérer mes résultats</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Clé unique
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Entrez la clé fournie par votre instructeur"
                className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Fermer
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              Récupérer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
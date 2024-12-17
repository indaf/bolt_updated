import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useResultStore } from '../store/resultStore';
import { useAuthStore } from '../store/authStore';

interface GenerateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
  shooterId: string;
}

export function GenerateKeyModal({ isOpen, onClose, exerciseId, shooterId }: GenerateKeyModalProps) {
  const { user } = useAuthStore();
  const generateKey = useResultStore((state) => state.generateKey);
  const [copied, setCopied] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleGenerateKey = () => {
    const resultKey = generateKey(exerciseId, shooterId, user.id);
    setGeneratedKey(resultKey.key);
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

        <h2 className="text-xl font-semibold text-white mb-6">Générer une clé unique</h2>

        {!generatedKey ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              Cette clé permettra au tireur de récupérer tous ses résultats pour cet exercice.
              Une fois générée, transmettez-la lui de manière sécurisée.
            </p>

            <div className="flex justify-end">
              <button
                onClick={handleGenerateKey}
                className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                         hover:bg-[#007B56] transition-colors"
              >
                Générer la clé
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-[#2A2B32] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg text-white">{generatedKey}</span>
                <button
                  onClick={handleCopyKey}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Transmettez cette clé au tireur pour qu'il puisse récupérer ses résultats.
            </p>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
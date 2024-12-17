import React, { useState } from 'react';
import { X, Mail, AlertCircle } from 'lucide-react';

interface EmailChangeModalProps {
  currentEmail: string;
  onClose: () => void;
  onConfirm: (newEmail: string) => void;
}

export function EmailChangeModal({ currentEmail, onClose, onConfirm }: EmailChangeModalProps) {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ici, nous simulons l'envoi d'un email de vérification
    // Dans une vraie application, cela devrait :
    // 1. Vérifier le mot de passe actuel
    // 2. Envoyer un email de confirmation au nouvel email
    // 3. Attendre que l'utilisateur clique sur le lien de confirmation
    // 4. Seulement ensuite, mettre à jour l'email

    alert("Un email de confirmation a été envoyé à " + newEmail + 
          ". Veuillez cliquer sur le lien dans l'email pour confirmer le changement.");
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

        <h2 className="text-xl font-semibold text-white mb-6">Modifier l'email</h2>

        <div className="mb-6 p-4 bg-[#343541] rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#009B70] shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="mb-2">
                Pour des raisons de sécurité, la modification de votre email nécessite :
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>La saisie de votre mot de passe actuel</li>
                <li>Une confirmation via un lien envoyé au nouvel email</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email actuel
            </label>
            <input
              type="email"
              value={currentEmail}
              disabled
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nouvel email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
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
              Envoyer le lien de confirmation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Camera, UserIcon, Hash, Briefcase, Lock, Edit2, AlertCircle } from 'lucide-react';
import { User, useAuthStore } from '../store/authStore';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { EmailChangeModal } from './EmailChangeModal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);
  const updateUser = useAuthStore((state) => state.updateUser);
  const deleteUser = useAuthStore((state) => state.deleteUser);
  const logout = useAuthStore((state) => state.logout);

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    personalEmail: user.personalEmail || '',
    mobile: user.mobile || '',
    birthDate: user.birthDate || '',
    birthPlace: user.birthPlace || '',
    address: user.address || '',
    postalCode: user.postalCode || '',
    city: user.city || '',
    country: user.country || '',
    militaryId: user.militaryId || '',
    regiment: user.regiment || '',
    unit: user.unit || '',
    function: user.function || '',
    rank: user.rank || '',
    professionalEmail: user.professionalEmail || '',
    professionalPhone: user.professionalPhone || '',
    uniqueId: user.uniqueId || '',
    newsletter: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    onClose();
  };

  const handleDeleteAccount = () => {
    if (user) {
      deleteUser(user.id);
      logout();
      onClose();
    }
  };

  const canChangeUniqueId = !user.uniqueIdChanges || (
    Date.now() - user.uniqueIdChanges.lastChange > 7 * 24 * 60 * 60 * 1000 && 
    user.uniqueIdChanges.count < 2
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-[#202123] rounded-lg w-full max-w-6xl relative max-h-[90vh] flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Menu latéral */}
        <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#343541] p-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#009B70] flex items-center justify-center">
                  <span className="text-xl font-medium text-white">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 bg-[#343541] rounded-full
                         flex items-center justify-center hover:bg-[#3E3F4B]
                         transition-colors duration-200"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm font-medium text-gray-300">
                {user.uniqueId}
              </span>
              {canChangeUniqueId && (
                <button
                  onClick={() => {
                    const newId = prompt('Nouvel identifiant :');
                    if (newId) {
                      updateUser({ 
                        uniqueId: newId,
                        uniqueIdChanges: {
                          lastChange: Date.now(),
                          count: (user.uniqueIdChanges?.count || 0) + 1,
                          history: [...(user.uniqueIdChanges?.history || []), user.uniqueId]
                        }
                      });
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  title="Modifier l'identifiant (limité à 2 fois par semaine)"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <nav className="flex flex-row lg:flex-col gap-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                transition-colors duration-200
                ${activeTab === 'personal'
                  ? 'bg-[#009B70] text-white'
                  : 'text-gray-400 hover:bg-[#2A2B32] hover:text-white'
                }
              `}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Mes coordonnées</span>
            </button>

            <button
              onClick={() => setActiveTab('professional')}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                transition-colors duration-200
                ${activeTab === 'professional'
                  ? 'bg-[#009B70] text-white'
                  : 'text-gray-400 hover:bg-[#2A2B32] hover:text-white'
                }
              `}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden lg:inline">Ma carrière</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                transition-colors duration-200
                ${activeTab === 'account'
                  ? 'bg-[#009B70] text-white'
                  : 'text-gray-400 hover:bg-[#2A2B32] hover:text-white'
                }
              `}
            >
              <Lock className="w-4 h-4" />
              <span className="hidden lg:inline">Compte et sécurité</span>
            </button>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Coordonnées</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="flex-1 px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                   text-gray-400 cursor-not-allowed"
                        />
                        <button
                          type="button"
                          onClick={() => setShowEmailChangeModal(true)}
                          className="px-3 py-1.5 text-sm bg-[#343541] text-white rounded-lg
                                   hover:bg-[#3E3F4B] transition-colors whitespace-nowrap"
                        >
                          Modifier
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Pour des raisons de sécurité, la modification de l'email nécessite une vérification.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Téléphone mobile
                      </label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Adresse</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Informations militaires</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Matricule
                      </label>
                      <input
                        type="text"
                        value={formData.militaryId}
                        onChange={(e) => setFormData(prev => ({ ...prev, militaryId: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Grade
                      </label>
                      <input
                        type="text"
                        value={formData.rank}
                        onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Affectation</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Régiment
                      </label>
                      <input
                        type="text"
                        value={formData.regiment}
                        onChange={(e) => setFormData(prev => ({ ...prev, regiment: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        value={formData.unit}
                        onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Contact professionnel</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email professionnel
                      </label>
                      <input
                        type="email"
                        value={formData.professionalEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, professionalEmail: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Téléphone professionnel
                      </label>
                      <input
                        type="tel"
                        value={formData.professionalPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, professionalPhone: e.target.value }))}
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Sécurité</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Suppression du compte</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    La suppression de votre compte est définitive et entraînera la perte de toutes vos données.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                  >
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            )}

            {/* Boutons fixes en bas */}
            <div className="pt-4 mt-4 border-t border-[#343541] flex justify-end gap-3">
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
          </form>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Suppression définitive de mon compte"
        message="Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible et entraînera la perte de toutes vos données."
      />

      {showEmailChangeModal && (
        <EmailChangeModal
          currentEmail={user.email}
          onClose={() => setShowEmailChangeModal(false)}
          onConfirm={(newEmail) => {
            updateUser({ email: newEmail });
            setShowEmailChangeModal(false);
          }}
        />
      )}
    </div>
  );
}
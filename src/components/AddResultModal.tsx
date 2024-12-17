import React, { useState } from 'react';
import { X, Plus, Search, AlertTriangle, Clock, Shield, Target } from 'lucide-react';
import { useShooterStore } from '../store/shooterStore';
import { useResultStore } from '../store/resultStore';
import { useAuthStore } from '../store/authStore';
import { calculateScore } from '../utils/scoring';
import { ExerciseScoreCard } from './ExerciseScoreCard';

interface AddResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
}

type Step = 'shooter' | 'results';

interface FormData {
  shooterId: string;
  miss: string;
  out: string;
  time: string;
  gesture: 'yes' | 'no';
  gestureComment?: string;
  sequence: 'yes' | 'no';
  sequenceComment?: string;
  stress: string;
  safety: 'yes' | 'no';
  safetyComment?: string;
}

export function AddResultModal({ isOpen, onClose, exerciseId }: AddResultModalProps) {
  const { user } = useAuthStore();
  const { shooters, addShooter } = useShooterStore();
  const addResult = useResultStore((state) => state.addResult);
  const [step, setStep] = useState<Step>('shooter');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddShooter, setShowAddShooter] = useState(false);
  const [selectedShooterId, setSelectedShooterId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    shooterId: '',
    miss: '',
    out: '',
    time: '',
    gesture: 'yes',
    sequence: 'yes',
    stress: '1',
    safety: 'yes'
  });

  const [newShooter, setNewShooter] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
  });

  if (!isOpen || !user) return null;

  const filteredShooters = shooters.filter(shooter => {
    const searchValue = searchTerm.toLowerCase();
    return (
      shooter.firstName.toLowerCase().includes(searchValue) ||
      shooter.lastName.toLowerCase().includes(searchValue) ||
      shooter.uniqueId.toLowerCase().includes(searchValue)
    );
  });

  const handleAddShooter = (e: React.FormEvent) => {
    e.preventDefault();
    const shooter = addShooter(newShooter);
    setSelectedShooterId(shooter.id);
    setShowAddShooter(false);
    setStep('results');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = addResult({
      exerciseId,
      shooterId: selectedShooterId,
      instructorId: user.id,
      timestamp: Date.now(),
      data: {
        miss: formData.miss,
        out: formData.out,
        time: formData.time,
        gesture: formData.gesture,
        gestureComment: formData.gestureComment,
        sequence: formData.sequence,
        sequenceComment: formData.sequenceComment,
        stress: formData.stress,
        safety: formData.safety,
        safetyComment: formData.safetyComment
      }
    });

    if (result) {
      onClose();
    }
  };

  const score = calculateScore({ id: exerciseId, data: {} } as any, {
    miss: parseInt(formData.miss) || 0,
    out: parseInt(formData.out) || 0,
    time: parseFloat(formData.time) || 0,
    gesture: formData.gesture,
    sequence: formData.sequence,
    safety: formData.safety
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Ajouter un résultat</h2>

        {step === 'shooter' ? (
          <>
            {!showAddShooter ? (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un tireur..."
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  />
                </div>

                <div className="space-y-2">
                  {filteredShooters.map((shooter) => (
                    <button
                      key={shooter.id}
                      onClick={() => {
                        setSelectedShooterId(shooter.id);
                        setStep('results');
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2B32] transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#009B70] flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {shooter.firstName[0]}
                          {shooter.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {shooter.firstName} {shooter.lastName}
                        </p>
                        <p className="text-sm text-gray-400">{shooter.uniqueId}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowAddShooter(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed
                           border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600
                           transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter un nouveau tireur
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddShooter} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={newShooter.firstName}
                      onChange={(e) => setNewShooter(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={newShooter.lastName}
                      onChange={(e) => setNewShooter(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
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
                    value={newShooter.birthDate}
                    onChange={(e) => setNewShooter(prev => ({ ...prev, birthDate: e.target.value }))}
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
                    value={newShooter.birthPlace}
                    onChange={(e) => setNewShooter(prev => ({ ...prev, birthPlace: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddShooter(false)}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                             hover:bg-[#007B56] transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Résultat sur cible */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#009B70]" />
                Résultat sur cible
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Miss
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.miss}
                    onChange={(e) => setFormData(prev => ({ ...prev, miss: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Impacts hors de la forme géométrique mais dans la feuille
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Out
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.out}
                    onChange={(e) => setFormData(prev => ({ ...prev, out: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Impacts hors de la cible en papier
                  </p>
                </div>
              </div>
            </div>

            {/* Performance temporelle */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#009B70]" />
                Performance temporelle
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Temps total (secondes)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  required
                />
              </div>
            </div>

            {/* Technique et consignes */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                Technique et consignes
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Respect de la gestuelle
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gesture"
                        value="yes"
                        checked={formData.gesture === 'yes'}
                        onChange={(e) => setFormData(prev => ({ ...prev, gesture: e.target.value as 'yes' | 'no' }))}
                        className="text-[#009B70] focus:ring-[#009B70]"
                      />
                      <span className="text-sm text-gray-300">Correct</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gesture"
                        value="no"
                        checked={formData.gesture === 'no'}
                        onChange={(e) => setFormData(prev => ({ ...prev, gesture: e.target.value as 'yes' | 'no' }))}
                        className="text-[#009B70] focus:ring-[#009B70]"
                      />
                      <span className="text-sm text-gray-300">Incorrect</span>
                    </label>
                  </div>
                  {formData.gesture === 'no' && (
                    <textarea
                      value={formData.gestureComment}
                      onChange={(e) => setFormData(prev => ({ ...prev, gestureComment: e.target.value }))}
                      placeholder="Commentaire (facultatif)"
                      className="mt-2 w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                               resize-none h-20"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Respect des consignes
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sequence"
                        value="yes"
                        checked={formData.sequence === 'yes'}
                        onChange={(e) => setFormData(prev => ({ ...prev, sequence: e.target.value as 'yes' | 'no' }))}
                        className="text-[#009B70] focus:ring-[#009B70]"
                      />
                      <span className="text-sm text-gray-300">Oui</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sequence"
                        value="no"
                        checked={formData.sequence === 'no'}
                        onChange={(e) => setFormData(prev => ({ ...prev, sequence: e.target.value as 'yes' | 'no' }))}
                        className="text-[#009B70] focus:ring-[#009B70]"
                      />
                      <span className="text-sm text-gray-300">Non</span>
                    </label>
                  </div>
                  {formData.sequence === 'no' && (
                    <textarea
                      value={formData.sequenceComment}
                      onChange={(e) => setFormData(prev => ({ ...prev, sequenceComment: e.target.value }))}
                      placeholder="Commentaire (facultatif)"
                      className="mt-2 w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                               resize-none h-20"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Stress perçu */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#009B70]" />
                Stress perçu
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Niveau de stress ressenti (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stress}
                  onChange={(e) => setFormData(prev => ({ ...prev, stress: e.target.value }))}
                  className="w-full accent-[#009B70]"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>1</span>
                  <span>Niveau {formData.stress}</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#009B70]" />
                Sécurité
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Respect des règles de sécurité
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="safety"
                      value="yes"
                      checked={formData.safety === 'yes'}
                      onChange={(e) => setFormData(prev => ({ ...prev, safety: e.target.value as 'yes' | 'no' }))}
                      className="text-[#009B70] focus:ring-[#009B70]"
                    />
                    <span className="text-sm text-gray-300">Oui</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="safety"
                      value="no"
                      checked={formData.safety === 'no'}
                      onChange={(e) => setFormData(prev => ({ ...prev, safety: e.target.value as 'yes' | 'no' }))}
                      className="text-[#009B70] focus:ring-[#009B70]"
                    />
                    <span className="text-sm text-gray-300">Non</span>
                  </label>
                </div>
                {formData.safety === 'no' && (
                  <textarea
                    value={formData.safetyComment}
                    onChange={(e) => setFormData(prev => ({ ...prev, safetyComment: e.target.value }))}
                    placeholder="Commentaire (facultatif)"
                    className="mt-2 w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                             resize-none h-20"
                  />
                )}
              </div>
            </div>

            {/* Score calculé */}
            <ExerciseScoreCard score={score} showDetails />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setStep('shooter')}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Retour
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
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { AlertTriangle, Clock, Target, Shield, Check, X } from 'lucide-react';
import { ExerciseScore, getScoreColor, getLevelLabel } from '../utils/scoring';

interface ExerciseScoreCardProps {
  score: ExerciseScore;
  showDetails?: boolean;
}

export function ExerciseScoreCard({ score, showDetails = false }: ExerciseScoreCardProps) {
  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-medium text-white">Score final</h3>
          <p className={`text-3xl font-bold ${getScoreColor(score.total)}`}>
            {score.total}/20
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Niveau</p>
          <p className={`text-lg font-medium ${getScoreColor(score.total)}`}>
            {getLevelLabel(score.level)}
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {/* Miss */}
          {score.penalties.miss.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-white">Miss</p>
                  <p className="text-xs text-gray-400">
                    {score.penalties.miss.length} impact{score.penalties.miss.length > 1 ? 's' : ''} hors cible
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {score.penalties.miss.map((penalty, index) => (
                  <span key={index} className="text-sm font-medium text-yellow-500">
                    {penalty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Out */}
          {score.penalties.out.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-white">Out</p>
                  <p className="text-xs text-gray-400">
                    {score.penalties.out.length} impact{score.penalties.out.length > 1 ? 's' : ''} hors papier
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {score.penalties.out.map((penalty, index) => (
                  <span key={index} className="text-sm font-medium text-red-500">
                    {penalty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Temps */}
          {score.penalties.time > 0 && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-white">Temps</p>
                  <p className="text-xs text-gray-400">
                    Dépassement du temps idéal
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-500">
                -{score.penalties.time}
              </span>
            </div>
          )}

          {/* Gestuelle */}
          {score.penalties.gesture && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-white">Gestuelle</p>
                  <p className="text-xs text-gray-400">
                    Non-respect de la gestuelle
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-orange-500">-3</span>
            </div>
          )}

          {/* Séquence */}
          {score.penalties.sequence && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-white">Séquence</p>
                  <p className="text-xs text-gray-400">
                    Non-respect des consignes
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-orange-500">-3</span>
            </div>
          )}

          {/* Sécurité */}
          {score.penalties.safety && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-white">Sécurité</p>
                  <p className="text-xs text-gray-400">
                    Non-respect des règles de sécurité
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-red-500">-10</span>
            </div>
          )}

          {/* Aucune pénalité */}
          {score.total === 20 && (
            <div className="flex items-center justify-between p-3 bg-[#2A2B32] rounded-lg">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-white">Performance parfaite</p>
                  <p className="text-xs text-gray-400">
                    Aucune pénalité
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">+20</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
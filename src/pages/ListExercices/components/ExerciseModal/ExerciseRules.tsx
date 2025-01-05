import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface ExerciseRulesProps {
  rules: {
    weaponType: string;
    weaponTransition: boolean;
    firstWeapon: string;
    startingPosition: string;
    ammoWithoutConstraints: number;
    ammoWithConstraints: number;
    magazineChangePA: number;
    magazineChangeFA: number;
    magazine1PA: number;
    magazine2PA: number;
    magazine1FA: number;
    magazine2FA: number;
    shooterCount: number;
  };
}

export function ExerciseRules({ rules }: ExerciseRulesProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label="rules">📋</span>
        <h3 className="text-xl font-bold text-gray-800">Règles de tir</h3>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-700 font-medium">Respectez les règles de sécurité</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p><span className="font-medium">Type d'arme:</span> {rules.weaponType}</p>
          <p><span className="font-medium">Transition d'arme:</span> {rules.weaponTransition ? 'Oui' : 'Non'}</p>
          <p><span className="font-medium">Première arme:</span> {rules.firstWeapon}</p>
          <p><span className="font-medium">Position au départ:</span> {rules.startingPosition}</p>
          <p><span className="font-medium">Munition sans contraintes:</span> {rules.ammoWithoutConstraints || 0}</p>
          <p><span className="font-medium">Munition avec contraintes:</span> {rules.ammoWithConstraints || 0}</p>
        </div>
        <div className="space-y-2">
          {rules.magazineChangePA > 0 && (
            <>
              <p><span className="font-medium">Changement chargeur PA:</span> {rules.magazineChangePA}</p>
              <p><span className="font-medium">Munition chargeur n°1 PA:</span> {rules.magazine1PA}</p>
              <p><span className="font-medium">Munition chargeur n°2 PA:</span> {rules.magazine2PA}</p>
            </>
          )}
          {rules.magazineChangeFA > 0 && (
            <>
              <p><span className="font-medium">Changement chargeur FA:</span> {rules.magazineChangeFA}</p>
              <p><span className="font-medium">Munition chargeur n°1 FA:</span> {rules.magazine1FA}</p>
              <p><span className="font-medium">Munition chargeur n°2 FA:</span> {rules.magazine2FA}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
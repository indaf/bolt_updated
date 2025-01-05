import React from 'react';
import { Exercise } from '../../types/Exercise';

interface AmmunitionDetailsProps {
  ammunition: NonNullable<Exercise['ammunition']>;
}

export function AmmunitionDetails({ ammunition }: AmmunitionDetailsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-4">Munitions</h3>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">Sans contraintes</dt>
          <dd className="font-medium">{ammunition.withoutConstraints}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Avec contraintes</dt>
          <dd className="font-medium">{ammunition.withConstraints}</dd>
        </div>
        {ammunition.magazineChangesPA && (
          <>
            <div className="flex justify-between">
              <dt className="text-gray-600">Chargeur 1 PA</dt>
              <dd className="font-medium">{ammunition.magazine1PA}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Chargeur 2 PA</dt>
              <dd className="font-medium">{ammunition.magazine2PA}</dd>
            </div>
          </>
        )}
        {ammunition.magazineChangesFA && (
          <>
            <div className="flex justify-between">
              <dt className="text-gray-600">Chargeur 1 FA</dt>
              <dd className="font-medium">{ammunition.magazine1FA}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Chargeur 2 FA</dt>
              <dd className="font-medium">{ammunition.magazine2FA}</dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
}
import React from 'react';
import { AlertCircle } from 'lucide-react';

export function PendingInstructorBanner() {
  return (
    <div className="bg-[#DC002B]/10 border border-[#DC002B]/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#DC002B] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-[#DC002B] mb-1">
            Compte instructeur en attente de validation
          </h3>
          <p className="text-sm text-gray-300">
            Votre compte est actuellement en cours de validation par notre équipe. 
            Certaines fonctionnalités sont temporairement limitées. 
            Vous serez notifié par email dès que votre compte sera validé.
          </p>
        </div>
      </div>
    </div>
  );
}
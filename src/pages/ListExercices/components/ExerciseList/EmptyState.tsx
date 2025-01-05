import React from 'react';
import { SearchX } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <SearchX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">Aucun exercice trouvé</p>
      <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos critères de recherche</p>
    </div>
  );
}
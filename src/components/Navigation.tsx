import React from 'react';
import { BarChart2, Table, Plus } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <div className="bg-[#0C0C0C] border-b border-[#242424]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                Générateur d'exercice
              </h1>
              <p className="text-sm text-gray-400">
                Créez et gérez vos exercices de tir personnalisés
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onPageChange('dashboard')}
                className={`btn ${currentPage === 'dashboard' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
              >
                <BarChart2 className="w-4 h-4" />
                Tableau de bord
              </button>
              <button
                onClick={() => onPageChange('list')}
                className={`btn ${currentPage === 'list' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
              >
                <Table className="w-4 h-4" />
                Mes exercices
              </button>
              <button
                onClick={() => onPageChange('create')}
                className={`btn ${currentPage === 'create' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
              >
                <Plus className="w-4 h-4" />
                Créer un exercice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
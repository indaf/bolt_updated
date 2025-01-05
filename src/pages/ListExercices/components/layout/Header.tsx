import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">Exercices de tir</h1>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher un exercice..."
              className="w-full pl-9 pr-4 py-1.5 text-sm border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ModuleType, ExerciseCategory } from '../types/Exercise';

interface ExerciseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedModule: ModuleType | undefined;
  onModuleChange: (value: ModuleType | undefined) => void;
  selectedCategory: ExerciseCategory;
  onCategoryChange: (value: ExerciseCategory) => void;
  modules: ModuleType[];
  categories: ExerciseCategory[];
}

export function ExerciseFilters({
  searchTerm,
  onSearchChange,
  selectedModule,
  onModuleChange,
  selectedCategory,
  onCategoryChange,
  modules,
  categories
}: ExerciseFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            placeholder="Rechercher un exercice..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedModule || ''}
            onChange={(e) => onModuleChange(e.target.value as ModuleType || undefined)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option value="">Tous les modules</option>
            {modules.map((module) => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as ExerciseCategory)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'modèles' ? 'Par modèles' :
                 category === 'semaines' ? 'Par semaines' :
                 'Par mois'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
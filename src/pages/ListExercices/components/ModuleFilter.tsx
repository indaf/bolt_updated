import React from 'react';
import { ModuleType } from '../types/Exercise';

interface ModuleFilterProps {
  modules: ModuleType[];
  selectedModule?: ModuleType;
  onModuleChange: (module?: ModuleType) => void;
}

export function ModuleFilter({ modules, selectedModule, onModuleChange }: ModuleFilterProps) {
  return (
    <select
      value={selectedModule || ''}
      onChange={(e) => onModuleChange(e.target.value as ModuleType || undefined)}
      className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Tous les modules</option>
      {modules.map((module) => (
        <option key={module} value={module}>{module}</option>
      ))}
    </select>
  );
}
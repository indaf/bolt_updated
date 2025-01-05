import React from "react";
import { Filter } from "lucide-react";
import { MultiSelect } from "./MultiSelect";
import { FilterChip } from "./FilterChip";
import { ModuleType, ExerciseCategory, WeaponType } from "../../types/Exercise";

interface FilterBarProps {
  modules: ModuleType[];
  categories: ExerciseCategory[];
  targetModels: string[];
  weaponTypes: WeaponType[];
  selectedFilters: {
    module?: ModuleType;
    category?: ExerciseCategory;
    targetModels: string[];
    weaponType?: WeaponType;
  };
  onFilterChange: (type: string, value?: string | string[]) => void;
}

export function FilterBar({
  modules,
  categories,
  targetModels,
  weaponTypes,
  selectedFilters,
  onFilterChange,
}: FilterBarProps) {
  // Réinitialiser les modèles de cible si la catégorie n'est pas "modèles"
  React.useEffect(() => {
    if (
      selectedFilters.category !== "modèles" &&
      selectedFilters.targetModels.length > 0
    ) {
      onFilterChange("targetModels", []);
    }
  }, [selectedFilters.category]);

  const isTargetModelEnabled = selectedFilters.category === "modèles";

  return (
    <div className="sticky top-14 z-10">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Catégorie
            </label>
            <select
              value={selectedFilters.category || ""}
              onChange={(e) =>
                onFilterChange("category", e.target.value || undefined)
              }
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white focus:outline-none focus:border-[#009B70]"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isTargetModelEnabled ? "text-slate-100" : "text-gray-600"
              }`}
            >
              Modèles de cible
            </label>
            <MultiSelect
              options={targetModels}
              selectedValues={selectedFilters.targetModels}
              onChange={(values) => onFilterChange("targetModels", values)}
              placeholder="Sélectionner des cibles"
              disabled={!isTargetModelEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Module
            </label>
            <select
              value={selectedFilters.module || ""}
              onChange={(e) =>
                onFilterChange("module", e.target.value || undefined)
              }
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
               text-white focus:outline-none focus:border-[#009B70]"
            >
              <option value="">Tous les modules</option>
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type d'arme
            </label>
            <select
              value={selectedFilters.weaponType || ""}
              onChange={(e) =>
                onFilterChange("weaponType", e.target.value || undefined)
              }
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
             text-white focus:outline-none focus:border-[#009B70]"
            >
              <option value="">Tous les types</option>
              {weaponTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

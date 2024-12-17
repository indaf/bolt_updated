import React from "react";
import { Users, UserPlus, Medal, Target } from "lucide-react";

interface DiscoverFiltersProps {
  currentFilter: "all" | "suggestions" | "following" | "achievements";
  onFilterChange: (
    filter: "all" | "suggestions" | "following" | "achievements"
  ) => void;
}

export function DiscoverFilters({
  currentFilter,
  onFilterChange,
}: DiscoverFiltersProps) {
  const filters = [
    { id: "all", label: "Tout", icon: Users },
    { id: "suggestions", label: "Suggestions", icon: UserPlus },
    { id: "following", label: "Relations", icon: Users },
    { id: "achievements", label: "Récompenses", icon: Medal },
  ] as const;

  return (
    <div className="flex gap-4 mb-8 flex-wrap justify-center items-center">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id as typeof currentFilter)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${
              currentFilter === filter.id
                ? "bg-[#009B70] text-white"
                : "bg-[#202123] text-gray-400 hover:text-white"
            }
          `}
        >
          <filter.icon className="w-4 h-4" />
          {filter.label}
        </button>
      ))}
    </div>
  );
}

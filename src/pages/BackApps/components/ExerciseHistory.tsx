import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

interface ExerciseHistoryEntry {
  id: string;
  name: string;
  instructorId: string;
  instructorName: string;
  timestamp: number;
  difficulty: number;
  criteria: {
    distance: string;
    targets: string;
    shooters: string;
    lighting: string;
    equipment: string;
    weapon: string;
    bodyPosition: string;
    trigger: string;
  };
  results: {
    total: number;
    averageScore: number;
    averageTime: number;
    bestScore: number;
  };
}

const ITEMS_PER_PAGE = 10;

const mockHistory: ExerciseHistoryEntry[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: `exercise-${i + 1}`,
    name: `Exercice ${i + 1}`,
    instructorId: `instructor-${Math.floor(Math.random() * 10) + 1}`,
    instructorName: `Instructeur ${Math.floor(Math.random() * 10) + 1}`,
    timestamp: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    difficulty: Math.floor(Math.random() * 61),
    criteria: {
      distance: ["faible", "moyen", "eleve"][Math.floor(Math.random() * 3)],
      targets: ["1", "4"][Math.floor(Math.random() * 2)],
      shooters: ["1", "2", "3", "4"][Math.floor(Math.random() * 4)],
      lighting: ["normal", "low", "night"][Math.floor(Math.random() * 3)],
      equipment: ["light", "heavy"][Math.floor(Math.random() * 2)],
      weapon: ["pistolet", "fusil"][Math.floor(Math.random() * 2)],
      bodyPosition: ["standing", "kneeling", "prone_front"][
        Math.floor(Math.random() * 3)
      ],
      trigger: ["libre", "sonore", "visuel", "tactile"][
        Math.floor(Math.random() * 4)
      ],
    },
    results: {
      total: Math.floor(Math.random() * 100) + 20,
      averageScore: Math.floor(Math.random() * 100),
      averageTime: Math.floor(Math.random() * 300) + 60,
      bestScore: Math.floor(Math.random() * 100),
    },
  })
);

interface Filters {
  search: string;
  minDifficulty: string;
  maxDifficulty: string;
  startDate: string;
  endDate: string;
  criteria: {
    distance: string[];
    weapon: string[];
    bodyPosition: string[];
  };
}

type ExerciceHistoryProps = {
  results: Array<any>;
  exercises: Array<any>;
};

export function ExerciseHistory({ results, exercises }: ExerciceHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    minDifficulty: "",
    maxDifficulty: "",
    startDate: "",
    endDate: "",
    criteria: {
      distance: [],
      weapon: [],
      bodyPosition: [],
    },
  });

  const filteredHistory = exercises.filter((entry) => {
    if (
      filters.search &&
      !entry.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !entry.user.first_name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !entry.user.last_name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.minDifficulty &&
      entry.data.difficulty < parseInt(filters.minDifficulty)
    )
      return false;
    if (
      filters.maxDifficulty &&
      entry.data.difficulty > parseInt(filters.maxDifficulty)
    )
      return false;
    if (
      filters.startDate &&
      new Date(entry.timestamp) < new Date(filters.startDate)
    )
      return false;
    if (
      filters.endDate &&
      new Date(entry.timestamp) > new Date(filters.endDate)
    )
      return false;

    if (
      filters.criteria.distance.length > 0 &&
      !filters.criteria.distance.includes(entry.data.distance)
    )
      return false;
    if (
      filters.criteria.weapon.length > 0 &&
      !filters.criteria.weapon.includes(entry.data.weapon)
    )
      return false;
    if (
      filters.criteria.bodyPosition.length > 0 &&
      !filters.criteria.bodyPosition.includes(entry.data.bodyPosition)
    )
      return false;

    return true;
  });

  const getAverageScore = (exerciseId: number) => {
    let allScores = results
      .filter((result: any) => result.exercise.id == exerciseId)
      .map((result: any) => (result.data.score ? result.data.score : 0));

    if (allScores.length == 0) return 0;
    return (
      allScores.reduce((prev, curr) => (prev += curr)) /
      results.filter((result: any) => result.exercise.id == exerciseId).length
    );
  };

  const getBestScore = (exerciseId: number) => {
    let allScores = results
      .filter((result: any) => result.exercise.id == exerciseId)
      .map((result: any) => (result.data.score ? result.data.score : 0));

    if (allScores.length == 0) return 0;
    return Math.max(...allScores);
  };

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = filteredHistory
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6 flex-col md:flex-row">
        <h2 className="text-xl font-medium text-white mb-4 md:mb-0">
          Historique des exercices
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-64 pl-9 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded transition-colors ${
              showFilters ? "text-[#009B70]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#2A2B32] rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Difficulté
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minDifficulty}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minDifficulty: e.target.value,
                  }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxDifficulty}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxDifficulty: e.target.value,
                  }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Critères
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {["faible", "moyen", "eleve"].map((distance) => (
                  <button
                    key={distance}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        data: {
                          ...prev.criteria,
                          distance: prev.criteria.distance.includes(distance)
                            ? prev.criteria.distance.filter(
                                (d) => d !== distance
                              )
                            : [...prev.criteria.distance, distance],
                        },
                      }))
                    }
                    className={`
                      px-2 py-1 text-xs rounded transition-colors
                      ${
                        filters.criteria.distance.includes(distance)
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-400 hover:text-white"
                      }
                    `}
                  >
                    Distance {distance}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Date
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#343541]">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Instructeur
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Difficulté
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Critères
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Résultats
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Note moyenne
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Meilleure note
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.map((entry) => (
              <tr key={entry.id} className="border-b border-[#343541]">
                <td className="px-4 py-3 text-white">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-white">{entry.name}</td>
                <td className="px-4 py-3 text-white">
                  {entry.user.first_name} {entry.user.last_name}
                </td>
                <td className="px-4 py-3 text-white">
                  {entry.data.difficulty ? entry.data.difficulty : 1}/61
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 text-xs bg-[#2A2B32] text-gray-300 rounded">
                      {entry.data.distance}
                    </span>
                    <span className="px-2 py-1 text-xs bg-[#2A2B32] text-gray-300 rounded">
                      {entry.data.weapon}
                    </span>
                    <span className="px-2 py-1 text-xs bg-[#2A2B32] text-gray-300 rounded">
                      {entry.data.bodyPosition}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-white">
                  {
                    results.filter(
                      (result: any) => result.exercise.id == entry.id
                    ).length
                  }
                </td>
                <td className="px-4 py-3 text-white">
                  {getAverageScore(entry.id)} / 20
                </td>
                <td className="px-4 py-3 text-white">
                  {getBestScore(entry.id)} / 20
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-400">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

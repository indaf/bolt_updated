import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

const ITEMS_PER_PAGE = 10;

interface Filters {
  search: string;
  minAccuracy: string;
  maxAccuracy: string;
  startDate: string;
  endDate: string;
}

type TempoGameHistoryProps = {
  results: Array<any>;
};

export function TempoGameHistory({ results }: TempoGameHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    minAccuracy: "",
    maxAccuracy: "",
    startDate: "",
    endDate: "",
  });

  console.log(results);

  const filteredHistory = results.filter((entry) => {
    if (
      filters.search &&
      !entry.user.first_name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !entry.user.last_name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.minAccuracy && entry.score < parseInt(filters.minAccuracy))
      return false;
    if (filters.maxAccuracy && entry.score > parseInt(filters.maxAccuracy))
      return false;
    if (filters.startDate && new Date(entry.date) < new Date(filters.startDate))
      return false;
    if (filters.endDate && new Date(entry.date) > new Date(filters.endDate))
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = filteredHistory
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6 flex-col md:flex-row">
        <h2 className="text-xl font-medium text-white mb-4 md:mb-0">
          Historique des parties
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
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
              Précision (%)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minAccuracy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minAccuracy: e.target.value,
                  }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxAccuracy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxAccuracy: e.target.value,
                  }))
                }
                className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                         text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
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
                Utilisateur
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Précision
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Correct Beat
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.map((entry) => (
              <tr key={entry.id} className="border-b border-[#343541]">
                <td className="px-4 py-3 text-white">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-white">
                  {entry.user.first_name} {entry.user.last_name}
                </td>
                <td className="px-4 py-3 text-white">{entry.score}%</td>
                <td className="px-4 py-3 text-white">
                  {entry.data.completedBeats} / 32
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

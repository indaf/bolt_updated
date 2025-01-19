import React, { useEffect, useState } from "react";
import { useResultStore } from "../store/resultStore";
import { useShooterStore } from "../store/shooterStore";
import { Exercise } from "../types/exercise";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { getExerciseResultsByExerciseId } from "../services/ExerciseResults/exerciseResults.service";
import { notifyError } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";

interface ExerciseStatisticsProps {
  exercise: any;
}

export function ExerciseStatistics({ exercise }: ExerciseStatisticsProps) {
  const [results, setResults] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (exercise) {
      loadExerciseResults();
    }
  }, [currentPage]);

  const loadExerciseResults = () => {
    getExerciseResultsByExerciseId(exercise.id, currentPage)
      .then((response: AxiosResponse) => {
        setResults(response.data.results);
        setTotalPages(response.data.total_page);
      })
      .catch((error) => {
        console.error(error);
        notifyError("Impossible de récupérer les résultats de l'exercice");
      });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#343541]">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Tireur
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Passage
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Miss
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Out
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Temps
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Gestuelle
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Consignes
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Sécurité
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Stress
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: any) => {
              return (
                <tr key={result.id} className="border-b border-[#343541]">
                  <td className="px-4 py-3 text-sm text-white">
                    {new Date(result.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {result.shooter?.first_name[0]}
                          {result.shooter?.last_name[0]}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p className="text-white">
                          {result.shooter?.first_name != "" &&
                          result.shooter?.last_name != ""
                            ? result.shooter?.first_name +
                              " " +
                              result.shooter?.last_name
                            : result.shooter?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    N°{result.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {result.data.miss || "0"}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {result.data.out || "0"}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {result.data.time}s
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${
                        result.data.gesture === "yes"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {result.data.gesture === "yes" ? "Correct" : "Incorrect"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${
                        result.data.sequence === "yes"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {result.data.sequence === "yes"
                        ? "Respectées"
                        : "Non respectées"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${
                        result.data.safety === "yes"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {result.data.safety === "yes"
                        ? "Respectées"
                        : "Non respectées"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 bg-[#343541] text-white rounded-full text-xs font-medium">
                      {result.data.stress}/10
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCopyKey(result.id)}
                      className="flex items-center gap-1 px-2 py-1 bg-[#343541] text-gray-400 
                               hover:text-white rounded-lg transition-colors text-sm"
                    >
                      {copiedKey === result.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="font-mono">{result.id}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
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

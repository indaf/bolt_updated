import React, { useContext, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Clock,
  AlertTriangle,
  Share2,
} from "lucide-react";
import { GameResult } from "..";
import { useProfileStore } from "../../../store/profileStore";
import { useAuthStore } from "../../../store/authStore";
import { AuthContext } from "../../../context/Auth.context";
import { useNavigate } from "react-router-dom";

interface HistoryProps {
  results: GameResult[];
  onBack: () => void;
}

const ITEMS_PER_PAGE = 10;

export function History({ results, onBack }: HistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results
    .reverse()
    .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleShare = (result: GameResult) => {
    if (!user) return;
    const totalAttempts = result.data.correct + result.data.incorrect;
    const accuracy =
      totalAttempts > 0 ? (result.data.correct / totalAttempts) * 100 : 0;

    const content = `Shoot/No Shoot Training\n\nPrécision: ${accuracy.toFixed(
      1
    )}%\nTemps de réaction moyen: ${result.data.averageReactionTime.toFixed(
      2
    )}s\nDécisions correctes: ${result.data.correct}\nMenaces manquées: ${
      result.missedThreats
    }\nFausses alertes: ${result.data.falseAlarms}`;
    navigate(`/profile/${user.id}`, { state: { content } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#202123] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Historique des parties
          </h2>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Retour
          </button>
        </div>

        <div className="space-y-4">
          {paginatedResults.map((result, index) => {
            const totalAttempts = result.data.correct + result.data.incorrect;
            const accuracy =
              totalAttempts > 0
                ? (result.data.correct / totalAttempts) * 100
                : 0;
            const date = new Date(result.date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={index} className="bg-[#2A2B32] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{date}</span>
                  <button
                    onClick={() => handleShare(result)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#009B70]" />
                    <div>
                      <p className="text-xs text-gray-400">Précision</p>
                      <p className="text-sm font-medium text-white">
                        {accuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#009B70]" />
                    <div>
                      <p className="text-xs text-gray-400">Temps moyen</p>
                      <p className="text-sm font-medium text-white">
                        {result.data.averageReactionTime.toFixed(2)}s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#009B70]" />
                    <div>
                      <p className="text-xs text-gray-400">Menaces manquées</p>
                      <p className="text-sm font-medium text-white">
                        {result.data.missedThreats}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#009B70]" />
                    <div>
                      <p className="text-xs text-gray-400">
                        Décisions correctes
                      </p>
                      <p className="text-sm font-medium text-white">
                        {result.data.correct}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
    </div>
  );
}

import React, { useContext } from "react";
import {
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart2,
  Share2,
} from "lucide-react";
import { AuthContext } from "../../../context/Auth.context";
import { useNavigate } from "react-router-dom";

interface ResultsProps {
  result: any;
  onPlayAgain: () => void;
  onViewStats: () => void;
}

export function Results({ result, onPlayAgain, onViewStats }: ResultsProps) {
  const { user } = useContext<any>(AuthContext);
  const totalAttempts = result.data.correct + result.data.incorrect;
  const accuracy =
    totalAttempts > 0 ? (result.data.correct / totalAttempts) * 100 : 0;
  const navigate = useNavigate();

  const handleShare = () => {
    if (!user) return;
    const content = `Shoot/No Shoot Training\n\nPrécision: ${accuracy.toFixed(
      1
    )}%\nTemps de réaction moyen: ${result.averageReactionTime.toFixed(
      2
    )}s\nDécisions correctes: ${result.correct}\nMenaces manquées: ${
      result.missedThreats
    }\nFausses alertes: ${result.falseAlarms}`;

    navigate(`/profile/${user.id}`, { state: { content } });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Résultats
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#2A2B32] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#009B70]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Précision</p>
                <p className="text-xl font-medium text-white">
                  {accuracy.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2B32] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Temps moyen</p>
                <p className="text-xl font-medium text-white">
                  {result.data.averageReactionTime?.toFixed(2)}s
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2B32] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Menaces manquées</p>
                <p className="text-xl font-medium text-white">
                  {result.data.missedThreats}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2B32] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Décisions correctes</p>
                <p className="text-xl font-medium text-white">
                  {result.data.correct}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 md:gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 px-2 gap-2 md:px-4 py-2 bg-[#009B70] text-white rounded-lg text-xs md:text-sm
                     hover:bg-[#007B56] transition-colors font-medium"
          >
            Rejouer
          </button>
          <button
            onClick={onViewStats}
            className="flex items-center justify-center px-2 gap-2 md:px-4 py-2 bg-[#343541] text-white rounded-lg text-xs md:text-sm
                     hover:bg-[#3E3F4B] transition-colors"
          >
            <BarChart2 className="w-5 h-5" />
            Statistiques
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-2 gap-2 md:px-4 py-2 bg-[#343541] text-white rounded-lg text-xs md:text-sm
                     hover:bg-[#3E3F4B] transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
        </div>
      </div>
    </div>
  );
}

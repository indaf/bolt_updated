import React, { useContext, useEffect, useState } from "react";
import { Clock, Target, TrendingUp, Share2 } from "lucide-react";
import { AuthContext } from "../../../context/Auth.context";
import { getGameScoresForUser } from "../../../services/GameScore/gameScore.service";
import { notifyError } from "../../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UserResultsProps {
  sortBy: "recent" | "best";
}

export function UserResults({ sortBy: initialSortBy }: UserResultsProps) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const { user } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const [userScores, setUserScores] = useState<Array<any>>([]);

  useEffect(() => {
    getGameScoresForUser("adaptive", sortBy)
      .then((response: AxiosResponse) => {
        setUserScores(response.data);
      })
      .catch((error) => {
        console.log(error);
        notifyError("Erreur lors de la récupération des scores");
      });
  }, [sortBy]);

  const handleShare = async (result: any) => {
    if (!user) return;

    const content = `Adaptive One Training\n\nScore: ${
      result.score
    }\nPrécision: ${100 - 25 * result.data.error}%\nTemps: ${
      result.data.duration
    }s\n\nConsigne: ${result.data.instruction}`;

    navigate(`/profile/${user.id}`, { state: { content } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setSortBy("recent")}
          className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
            sortBy === "recent"
              ? "bg-[#009B70] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Récent
        </button>
        <button
          onClick={() => setSortBy("best")}
          className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
            sortBy === "best"
              ? "bg-[#009B70] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Meilleur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meilleur score</p>
              <p className="text-xl font-medium text-white">
                {Math.max(...userScores.map((r) => r.score))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meilleur temps</p>
              <p className="text-xl font-medium text-white">
                {Math.min(...userScores.map((r) => r.data.duration))}s
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Précision moyenne</p>
              <p className="text-xl font-medium text-white">
                {Math.round(
                  userScores
                    .map((score: any) => 100 - 25 * score.data.error)
                    .reduce((acc, r) => acc + r, 0) / userScores.length
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {userScores.map((result) => (
          <div key={result.id} className="bg-[#202123] rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Score</p>
                      <p className="text-lg font-medium text-[#009B70]">
                        {result.score}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Temps</p>
                      <p className="text-lg font-medium text-[#009B70]">
                        {result.data.duration}s
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Précision</p>
                      <p className="text-lg font-medium text-[#009B70]">
                        {100 - 25 * result.data.error}%
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleShare(result)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-gray-400 bg-[#2A2B32] px-4 py-2 rounded-lg">
                Consigne : {result.data.instruction}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Votre séquence :</p>
                  <div className="flex gap-2">
                    {result.data.sequence.split(",").map((num: any, i) => (
                      <span
                        key={i}
                        className={`
                          px-3 py-1 rounded-lg text-sm font-medium
                          ${
                            num ===
                            result.data?.expected_sequence?.split(",")[i]
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    Séquence attendue :
                  </p>
                  <div className="flex gap-2">
                    {result.data?.expected_sequence
                      ?.split(",")
                      .map((num: any, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#343541] text-white rounded-lg text-sm font-medium"
                        >
                          {num}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

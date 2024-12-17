import React, { useEffect, useState } from "react";
import { Play, Trophy, History, BarChart2 } from "lucide-react";
import { GameComponent } from "./GameComponent";
import { Leaderboard } from "./components/Leaderboard";
import { UserResults } from "./components/UserResults";
import { Menu } from "./components/Menu";
import Layout from "../../components/Layout";
import { getTopGameScoresOfMonth } from "../../services/GameScore/gameScore.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../helpers/Notify.helper";

type View = "menu" | "game" | "leaderboard" | "results";

export function GamePage() {
  const [currentView, setCurrentView] = useState<View>("menu");
  const [bestsScores, setBestsScores] = useState<Array<any>>([]);

  useEffect(() => {
    getTopGameScoresOfMonth("adaptive")
      .then((response: AxiosResponse) => {
        setBestsScores(response.data);
      })
      .catch((error) => {
        console.log(error);
        notifyError("Erreur lors de la récupération des scores");
      });
  }, []);

  return (
    <Layout pageTitle="Adaptive One Training">
      <div className="flex flex-col h-full">
        <div className="bg-[#0C0C0C] border-b border-[#242424]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between py-6 flex-col md:flex-row">
                <div className="mb-4 md:mb-0 text-center">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                    Adaptive One Training
                  </h1>
                  <p className="text-sm text-gray-400">
                    Améliorez votre rapidité et votre précision
                  </p>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                  <button
                    onClick={() => setCurrentView("game")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        currentView === "game"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <Play className="w-4 h-4" />
                    Commencer
                  </button>
                  <button
                    onClick={() => setCurrentView("leaderboard")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        currentView === "leaderboard"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <Trophy className="w-4 h-4" />
                    Classements
                  </button>
                  <button
                    onClick={() => setCurrentView("results")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        currentView === "results"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <History className="w-4 h-4" />
                    Mes résultats
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {currentView === "menu" && <Menu scores={bestsScores} />}
            {currentView === "game" && <GameComponent />}
            {currentView === "leaderboard" && <Leaderboard />}
            {currentView === "results" && <UserResults sortBy="recent" />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

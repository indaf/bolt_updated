import React, { useEffect, useState } from "react";
import {
  Play,
  Settings as SettingsIcon,
  History as HistoryIcon,
} from "lucide-react";
import Layout from "../../components/Layout";
import { TempoGame } from "./components/TempoGame";
import { TempoSettings } from "./components/TempoSettings";
import { TempoHistory } from "./components/TempoHistory";
import { TempoSettings as Settings } from "./types";
import {
  createGameScore,
  getGameScoresForUser,
} from "../../services/GameScore/gameScore.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../helpers/Notify.helper";

type View = "settings" | "game" | "history";

export function TempoShooting() {
  const [currentView, setCurrentView] = useState<View>("settings");
  const [results, setResults] = useState<Array<any>>([]);
  const [settings, setSettings] = useState<Settings>({
    mode: "fixed",
    initialTempo: 120,
    countdownDuration: 3,
  });

  const loadResults = (moveToResult: boolean = false) => {
    getGameScoresForUser("tempo", "recent")
      .then((response: AxiosResponse) => {
        setResults(response.data);
        if (moveToResult) setCurrentView("history");
      })
      .catch((error) => {
        console.error("Error loading game scores", error);
        notifyError("Erreur lors du chargement des scores");
      });
  };

  const handleStartGame = (newSettings: Settings) => {
    setSettings(newSettings);
    setCurrentView("game");
  };

  const handleGameEnd = (result: any) => {
    console.log(result);
    const score = {
      data: result,
      score: result.accuracy,
      game: "tempo",
    };
    createGameScore(score)
      .then((response: AxiosResponse) => {
        loadResults(true);
        setCurrentView("history");
      })
      .catch((error) => {
        console.error("Error saving game score", error);
        notifyError("Erreur lors de la sauvegarde du score");
      });
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <Layout pageTitle="Tempo Shooting">
      <div className="flex flex-col h-full">
        {/* Navigation fixe avec z-index élevé */}
        <div className="bg-[#131415] border-b border-[#242424] sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between py-6 flex-col md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                    Tempo Shooting
                  </h1>
                  <p className="text-sm text-gray-400">
                    Entraînez votre précision temporelle en suivant le rythme
                  </p>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                  <button
                    onClick={() => setCurrentView("settings")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        currentView === "settings"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Configurer
                  </button>
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
                    onClick={() => setCurrentView("history")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        currentView === "history"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <HistoryIcon className="w-4 h-4" />
                    Historique
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {currentView === "settings" && (
              <TempoSettings onStart={handleStartGame} />
            )}
            {currentView === "game" && (
              <TempoGame settings={settings} onGameEnd={handleGameEnd} />
            )}
            {currentView === "history" && (
              <TempoHistory
                results={results}
                onBack={() => setCurrentView("settings")}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

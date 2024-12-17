import React, { useEffect, useState } from "react";
import { Settings } from "./components/Settings";
import { Game } from "./components/Game";
import { Results } from "./components/Results";
import { Stats } from "./components/Stats";
import { History } from "./components/History";
import {
  Play,
  Trophy,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import Layout from "../../components/Layout";
import {
  createGameScore,
  getGameScores,
  getGameScoresForUser,
  getTopGameScoresOfMonth,
} from "../../services/GameScore/gameScore.service";
import { notifyError } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { getTags } from "../../services/Tags/tags.service";
import { getGameMedia } from "../../services/GameMedia/gamemedia.service";
import { preloadImgs } from "../../helpers/Object.helper";

type View = "settings" | "game" | "results" | "stats" | "history";

export interface GameSettings {
  timeLimit: number;
  threatRatio: number;
  imagesCount: number;
  tags: Array<any>;
}

export function ShootNoShoot() {
  const [currentView, setCurrentView] = useState<View>("settings");
  const [tags, setTags] = useState<Array<any>>([]);
  const [settings, setSettings] = useState<GameSettings>({
    timeLimit: 2,
    threatRatio: 50,
    imagesCount: 20,
    tags: [],
  });
  const [images, setImages] = useState<Array<any>>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    loadResults();
    loadTags();
  }, []);

  const loadResults = (moveToResult: boolean = false) => {
    getGameScoresForUser("shoot-no-shoot", "recent")
      .then((response: AxiosResponse) => {
        setResults(response.data);
        if (moveToResult) setCurrentView("results");
      })
      .catch((error) => {
        console.error("Error loading game scores", error);
        notifyError("Erreur lors du chargement des scores");
      });
  };

  const loadTags = () => {
    getTags()
      .then((response: AxiosResponse) => {
        setTags(response.data);
        setSettings((prev) => ({
          ...prev,
          tags: response.data.map((tag: any) => tag.id),
        }));
      })
      .catch((error) => {
        console.error("Error loading tags", error);
        notifyError("Erreur lors du chargement des tags");
      });
  };

  const handleStartGame = (gameSettings: GameSettings) => {
    getGameMedia(
      gameSettings.tags,
      gameSettings.threatRatio,
      gameSettings.imagesCount
    )
      .then((response: AxiosResponse) => {
        response.data.forEach((media: any) => {
          preloadImgs([media.url]);
        });
        setImages(response.data);
        setSettings(gameSettings);
        setCurrentView("game");
      })
      .catch((error: any) => {
        console.error("Error loading game media", error);
        notifyError("Erreur lors du chargement des images");
      });
  };

  const handleGameEnd = (result: any) => {
    result.nb_target = images.length;
    const score = {
      data: result,
      score: (result.correct / (result.correct + result.incorrect)) * 100,
      game: "shoot-no-shoot",
    };
    createGameScore(score)
      .then((response: AxiosResponse) => {
        loadResults(true);
      })
      .catch((error) => {
        console.error("Error saving game score", error);
        notifyError("Erreur lors de la sauvegarde du score");
      });
  };

  return (
    <Layout pageTitle="Shoot / No Shoot">
      <div className="flex flex-col h-full">
        <div className="bg-[#0C0C0C] border-b border-[#242424]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between py-6 flex-col md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2 text-center">
                    Shoot / No Shoot
                  </h1>
                  <p className="text-sm text-gray-400 text-center">
                    Entraînez-vous à la reconnaissance rapide des menaces et à
                    la prise de décision
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
                    onClick={() => handleStartGame(settings)}
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
              <Settings tags={tags} onStart={handleStartGame} />
            )}

            {currentView === "game" && (
              <Game
                settings={settings}
                images={images}
                onGameEnd={handleGameEnd}
                onRetry={() => setCurrentView("game")}
                onConfigure={() => setCurrentView("settings")}
              />
            )}

            {currentView === "results" && (
              <Results
                result={results[0]}
                onPlayAgain={() => setCurrentView("game")}
                onViewStats={() => setCurrentView("stats")}
              />
            )}

            {currentView === "stats" && (
              <Stats
                results={results.reverse()}
                onBack={() => setCurrentView("settings")}
              />
            )}

            {currentView === "history" && (
              <History
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

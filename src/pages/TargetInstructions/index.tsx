import React, { useState } from "react";
import { Volume2, History } from "lucide-react";
import Layout from "../../components/Layout";
import { Generator } from "./components/Generator";
import { InstructionHistory } from "./components/InstructionHistory";
import { Instruction } from "./types";
import { createGameScore } from "../../services/GameScore/gameScore.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../helpers/Notify.helper";

export function TargetInstructions() {
  const [activeTab, setActiveTab] = useState<"generator" | "history">(
    "generator"
  );
  const [history, setHistory] = useState<Instruction[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleNewInstruction = (instruction: Instruction) => {
    setHistory((prev) => [instruction, ...prev].slice(0, 10));
    const score = {
      data: { instruction },
      score: 0,
      game: "consigne",
    };
    createGameScore(score)
      .then((_: AxiosResponse) => {})
      .catch((error) => {
        console.error("Error saving instruction", error);
        notifyError("Erreur lors de la sauvegarde de la consigne");
      });
  };

  return (
    <Layout pageTitle="Générateur de Consignes">
      <div className="flex flex-col h-full">
        <div className="bg-[#131415] border-b border-[#242424]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between py-6 flex-col md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                    Générateur de Consignes
                  </h1>
                  <p className="text-sm text-gray-400">
                    Générez des consignes aléatoires pour l'entraînement au tir
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab("generator")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        activeTab === "generator"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <Volume2 className="w-4 h-4" />
                    Générateur
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        activeTab === "history"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <History className="w-4 h-4" />
                    Historique
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "generator" ? (
              <Generator
                onNewInstruction={handleNewInstruction}
                isSoundEnabled={isSoundEnabled}
                onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
              />
            ) : (
              <InstructionHistory history={history} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { AppHeader } from "../../components/AppHeader";
import { json2csv } from "json-2-csv";
import {
  BarChart2,
  Users,
  Clock,
  Target,
  Grid,
  Activity,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../../components/Layout";
import { getGameScores } from "../../services/GameScore/gameScore.service";
import { notifyError, notifySuccess } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { calculateChartDataForConsignes } from "../../helpers/Chart.helper";
import { calculateStatsPerConsigne } from "../../helpers/Object.helper";
import { ConsigneHistory } from "./components/ConsigneHistory";
import { formatInstruction } from "../TargetInstructions/utils/instructionUtils";

type Tab = "stats" | "history";

export function BackConsignes() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [allResults, setAllResults] = useState<Array<any>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    getGameScores("consigne")
      .then((response: AxiosResponse) => {
        setAllResults(response.data);
        if (response.data.length > 0) {
          setChartData(calculateChartDataForConsignes(response.data));
        }
      })
      .catch((error: any) => {
        console.error("Error loading results", error);
        notifyError("Erreur lors du chargement des résultats");
      });
  };

  const getMostReccurentConsignes = () => {
    if (allResults.length > 0) {
      const exerciseCount: Array<any> = [];

      allResults.forEach((result: any) => {
        if (
          exerciseCount.filter(
            (ex: any) =>
              ex.name ==
              result.data.instruction.target +
                " - " +
                result.data.instruction.direction
          ).length > 0
        ) {
          exerciseCount[
            exerciseCount.findIndex(
              (ex: any) =>
                ex.name ==
                result.data.instruction.target +
                  " - " +
                  result.data.instruction.direction
            )
          ].appear++;
        } else {
          exerciseCount.push({
            appear: 1,
            name:
              formatInstruction(result.data.instruction, "target") +
              " - " +
              formatInstruction(result.data.instruction, "direction"),
          });
        }
      });

      return exerciseCount.sort((a, b) => (a.appear > b.appear ? 1 : -1))[0]
        ?.name;
    } else {
      return "Aucune consigne";
    }
  };

  const calculateAverageGamePerUser = () => {
    const uniqueUsers = new Set(allResults.map((item) => item.user.id)).size;
    return uniqueUsers ? allResults.length / uniqueUsers : 0;
  };

  return (
    <Layout pageTitle="Back Office - Générateur de consignes">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Office - Générateur de consignes"
            description="Statistiques et historique du générateur de consignes"
          />

          {/* Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("stats")}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${
                  activeTab === "stats"
                    ? "bg-[#009B70] text-white"
                    : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                }
              `}
            >
              <BarChart2 className="w-4 h-4" />
              Statistiques
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
              <Grid className="w-4 h-4" />
              Historique des consignes
            </button>
          </div>

          {activeTab === "stats" && (
            <>
              {/* Statistiques globales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#009B70]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Utilisateurs totaux
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {new Set(allResults.map((item) => item.user.id)).size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Exercices consultés
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {allResults.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Top Exercice</p>
                      <p className="text-xl font-medium text-white">
                        {getMostReccurentConsignes()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Moy. Exercices/utilisateur
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {calculateAverageGamePerUser().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
                {/* Utilisation quotidienne */}
                <div className="bg-[#202123] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Utilisation quotidienne
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                        <XAxis
                          dataKey="date"
                          stroke="#6B7280"
                          tick={{ fill: "#6B7280" }}
                        />
                        <YAxis stroke="#6B7280" tick={{ fill: "#6B7280" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#202123",
                            border: "1px solid #343541",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="games"
                          name="Exercices consultés"
                          stroke="#009B70"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Statistiques par utilisateur */}
              <div className="bg-[#202123] rounded-lg p-6">
                <div className="flex justify-between Items-center w-full">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Statistiques par consigne
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#343541]">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Forme
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Direction
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Consigne
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Affichages
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculateStatsPerConsigne(allResults).map((ex) => (
                        <tr
                          key={ex.exId}
                          className="border-b border-[#343541] cursor-pointer"
                        >
                          <td>
                            {ex.forme}
                            {formatInstruction(ex, "target")}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {formatInstruction(ex, "direction")}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {formatInstruction(ex, "target")} -{" "}
                            {formatInstruction(ex, "direction")}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {ex.displayed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "history" && (
            <ConsigneHistory
              results={allResults.sort((a, b) => (a.date < b.date ? 1 : -1))}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

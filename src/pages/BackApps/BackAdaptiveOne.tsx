import React, { useEffect, useState } from "react";
import { AppHeader } from "../../components/AppHeader";
import { BarChart2, Users, Clock, Target, Grid, Activity } from "lucide-react";
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
import { GameHistory } from "./components/GameHistory";
import Layout from "../../components/Layout";
import { getGameScores } from "../../services/GameScore/gameScore.service";
import { notifyError } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { calculateChartDataForAdaptive } from "../../helpers/Chart.helper";
import { calculateStatsAdaptivePerUser } from "../../helpers/Object.helper";

type Tab = "stats" | "history";

export function BackAdaptiveOne() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [allResults, setAllResults] = useState<Array<any>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    getGameScores("adaptive")
      .then((response: AxiosResponse) => {
        setAllResults(response.data);
        if (response.data.length > 0) {
          setChartData(calculateChartDataForAdaptive(response.data));
        }
      })
      .catch((error: any) => {
        console.error("Error loading results", error);
        notifyError("Erreur lors du chargement des résultats");
      });
  };

  const calculateAverageTime = () => {
    return (
      allResults
        .map((result: any) => result.data.duration)
        .reduce((a, b) => a + b, 0) / allResults.length
    );
  };

  const calculateAverageGamePerUser = () => {
    const uniqueUsers = new Set(allResults.map((item) => item.user.id)).size;
    return uniqueUsers ? allResults.length / uniqueUsers : 0;
  };

  return (
    <Layout pageTitle="Back Office - Adaptive One Training">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Office - Adaptive One Training"
            description="Statistiques et historique des parties"
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
              Historique des parties
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
                      <p className="text-sm text-gray-400">Parties jouées</p>
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
                      <p className="text-sm text-gray-400">
                        Temps moyen/partie
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {calculateAverageTime()}s
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
                        Parties/utilisateur
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {calculateAverageGamePerUser().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                          name="Parties jouées"
                          stroke="#009B70"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance moyenne */}
                <div className="bg-[#202123] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Performance moyenne
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
                          dataKey="accuracy"
                          name="Précision (%)"
                          stroke="#3B82F6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="avgTime"
                          name="Temps moyen (s)"
                          stroke="#DC2626"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Statistiques par utilisateur */}
              <div className="bg-[#202123] rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-6">
                  Statistiques par utilisateur
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#343541]">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Utilisateur
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Parties jouées
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Temps total
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Précision moyenne
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculateStatsAdaptivePerUser(allResults).map((user) => (
                        <tr
                          key={user.userId}
                          className="border-b border-[#343541]"
                        >
                          <td className="px-4 py-3 text-white">{user.name}</td>
                          <td className="px-4 py-3 text-white">
                            {user.gamesPlayed}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {user.totalTime} s
                          </td>
                          <td className="px-4 py-3 text-white">
                            {user.avgAccuracy}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "history" && <GameHistory results={allResults} />}
        </div>
      </div>
    </Layout>
  );
}

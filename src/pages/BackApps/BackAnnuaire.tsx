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
import { GameHistory } from "./components/GameHistory";
import Layout from "../../components/Layout";
import { getGameScores } from "../../services/GameScore/gameScore.service";
import { notifyError, notifySuccess } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { calculateChartDataForAdaptive } from "../../helpers/Chart.helper";
import {
  calculateStatsAdaptivePerUser,
  calculateStatsPerExercice,
} from "../../helpers/Object.helper";
import { FORMATTED_EXO } from "../ListExercices/data/exercises/formatted_exo";
import { AnnuaireHistory } from "./components/AnnuaireHistory";

type Tab = "stats" | "history";

export function BackAnnuaire() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [allResults, setAllResults] = useState<Array<any>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [selectedExo, setSelectedExo] = useState<Array<any>>([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    getGameScores("annuaire")
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

  const getBestExo = () => {
    if (allResults.length > 0) {
      const exerciseCount: { [key: string]: number } = {};

      allResults.forEach((result) => {
        const exoId = result.data.exercice_id;
        if (exerciseCount[exoId]) {
          exerciseCount[exoId]++;
        } else {
          exerciseCount[exoId] = 1;
        }
      });

      const bestExoId = Object.keys(exerciseCount).reduce((a, b) =>
        exerciseCount[a] > exerciseCount[b] ? a : b
      );
      return allResults.filter(
        (result) => result.data.exercice_id == bestExoId
      )[0].data.name;
    } else {
      return "Aucun exercice";
    }
  };

  const calculateAverageGamePerUser = () => {
    const uniqueUsers = new Set(allResults.map((item) => item.user.id)).size;
    return uniqueUsers ? allResults.length / uniqueUsers : 0;
  };

  const exportCsv = () => {
    let csv = json2csv(
      FORMATTED_EXO.filter((exo) => selectedExo.includes(exo.id))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "exercises.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notifySuccess("Exportation réussie");
    setSelectedExo([]);
  };

  return (
    <Layout pageTitle="Back Office - Annuaire d'exercices">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Office - Annuaire d'exercices"
            description="Statistiques et historique des consultations"
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
              Historique des consultations
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
                        {getBestExo()}
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
                    Statistiques par exercice
                  </h3>

                  <button
                    type="submit"
                    onClick={() => {
                      exportCsv();
                    }}
                    disabled={selectedExo.length === 0}
                    className={`px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                             hover:bg-[#007B56] transition-colors flex items-center gap-2 ${
                               selectedExo.length === 0 && "cursor-not-allowed"
                             }`}
                  >
                    <Download className="w-5 h-5" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#343541]">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400"></th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Exercice Id
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Nom
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Affichage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculateStatsPerExercice(allResults).map((ex) => (
                        <tr
                          key={ex.exId}
                          className="border-b border-[#343541] cursor-pointer"
                          onClick={() => {
                            {
                              if (!selectedExo.includes(ex.exId)) {
                                setSelectedExo([...selectedExo, ex.exId]);
                              } else {
                                setSelectedExo(
                                  selectedExo.filter((id) => id !== ex.exId)
                                );
                              }
                            }
                          }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              id={`selected_exo-${ex.exId}`}
                              checked={selectedExo.includes(ex.exId)}
                              onChange={(e) => {
                                if (!selectedExo.includes(ex.exId)) {
                                  setSelectedExo([...selectedExo, ex.exId]);
                                } else {
                                  setSelectedExo(
                                    selectedExo.filter((id) => id !== ex.exId)
                                  );
                                }
                              }}
                              className="rounded border-gray-700 text-[#009B70] focus:ring-[#009B70]"
                            />
                          </td>
                          <td className="px-4 py-3 text-white">{ex.exId}</td>
                          <td className="px-4 py-3 text-white">{ex.name}</td>
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
            <AnnuaireHistory
              results={allResults.sort((a, b) => (a.date < b.date ? 1 : -1))}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

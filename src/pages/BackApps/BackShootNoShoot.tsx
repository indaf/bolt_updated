import React, { useEffect, useState } from "react";
import { AppHeader } from "../../components/AppHeader";
import {
  BarChart2,
  Users,
  Clock,
  Target,
  AlertTriangle,
  Upload,
  Grid,
  Image,
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
import { ImageUploader } from "./components/ImageUploader";
import { ImageTable } from "./components/ImageTable";
import Layout from "../../components/Layout";
import { getGameScores } from "../../services/GameScore/gameScore.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../helpers/Notify.helper";
import { calculateChartForShootNoShoot } from "../../helpers/Chart.helper";

type Tab = "stats" | "upload" | "manage";

export function BackShootNoShoot() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [results, setResults] = useState<Array<any>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    getGameScores("shoot-no-shoot")
      .then((response: AxiosResponse) => {
        setResults(response.data);
        setChartData(calculateChartForShootNoShoot(response.data));
      })
      .catch((error: any) => {
        console.log(error);
        notifyError("Erreur lors du chargement des résultats");
      });
  };

  return (
    <Layout pageTitle="Back Office - Shoot/No Shoot">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Office - Shoot/No Shoot"
            description="Statistiques et gestion de l'application"
          />

          {/* Navigation */}
          <div className="flex gap-4 mb-8 flex-col md:flex-row">
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
              onClick={() => setActiveTab("upload")}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${
                  activeTab === "upload"
                    ? "bg-[#009B70] text-white"
                    : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                }
              `}
            >
              <Upload className="w-4 h-4" />
              Ajouter des images
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${
                  activeTab === "manage"
                    ? "bg-[#009B70] text-white"
                    : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                }
              `}
            >
              <Grid className="w-4 h-4" />
              Gérer les images
            </button>
          </div>

          {activeTab === "stats" && (
            <>
              {/* Statistiques globales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-[#009B70]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Sessions totales</p>
                      <p className="text-2xl font-medium text-white">
                        {results.length}
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
                      <p className="text-sm text-gray-400">Précision moyenne</p>
                      <p className="text-2xl font-medium text-white">
                        {results.length > 0
                          ? (
                              results
                                .map((result: any) => result.score)
                                ?.reduce((prev, curr) => (prev += curr)) /
                              results.length
                            ).toFixed(2)
                          : 0}
                        %
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
                        Temps de réaction moyen
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {results.length > 0
                          ? (
                              results
                                .map(
                                  (result: any) =>
                                    result.data.averageReactionTime
                                )
                                ?.reduce((prev, curr) => (prev += curr)) /
                              results.length
                            ).toFixed(2)
                          : 0}
                        s
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Utilisateurs actifs
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {
                          new Set(results.map((result: any) => result.user.id))
                            .size
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sessions quotidiennes */}
                <div className="bg-[#202123] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Sessions quotidiennes
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
                          dataKey="sessions"
                          name="Sessions"
                          stroke="#009B70"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Précision et temps de réaction */}
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
                          dataKey="reactionTime"
                          name="Temps de réaction (s)"
                          stroke="#DC2626"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "upload" && <ImageUploader />}
          {activeTab === "manage" && <ImageTable results={results} />}
        </div>
      </div>
    </Layout>
  );
}

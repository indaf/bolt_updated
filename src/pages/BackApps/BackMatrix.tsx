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
import { ExerciseHistory } from "./components/ExerciseHistory";
import Layout from "../../components/Layout";
import { getAllExercises } from "../../services/Exercise/exercise.service";
import { notifyError } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { calculateChartDataForExercise } from "../../helpers/Chart.helper";
import {
  calculateStatsByInstructor,
  retrievePopularCriteriaForExercise,
} from "../../helpers/Object.helper";
import { getAllExerciseResults } from "../../services/ExerciseResults/exerciseResults.service";

type Tab = "stats" | "history";

export function BackMatrix() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [exercises, setExercises] = useState<Array<any>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [popularCriteria, setPopularCriteria] = useState<Array<any>>([]);
  const [allResults, setAllResults] = useState<Array<any>>([]);
  const [instructorsResults, setInstructorsResults] = useState<Array<any>>([]);

  useEffect(() => {
    loadExercises();
    loadResults();
  }, []);

  const loadExercises = () => {
    getAllExercises()
      .then((response: AxiosResponse) => {
        setExercises(response.data);
        setChartData(calculateChartDataForExercise(response.data));
        setPopularCriteria(retrievePopularCriteriaForExercise(response.data));
      })
      .catch((error) => {
        console.log(error);
        notifyError("Erreur lors de la récupération des exercices");
      });
  };

  const loadResults = () => {
    getAllExerciseResults()
      .then((response: AxiosResponse) => {
        setAllResults(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        notifyError("Erreur lors de la récupération des résultats");
      });
  };

  useEffect(() => {
    if (exercises.length > 0 && allResults.length > 0) {
      setInstructorsResults(calculateStatsByInstructor(allResults, exercises));
    }
  }, [exercises, allResults]);
  return (
    <Layout pageTitle="Back Office - Générateur d'exercices">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Office - Générateur d'exercices"
            description="Statistiques et historique des exercices générés"
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
              Historique des exercices
            </button>
          </div>

          {activeTab === "stats" && (
            <>
              {/* Statistiques globales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#009B70]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Exercices créés</p>
                      <p className="text-2xl font-medium text-white">
                        {exercises.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202123] rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Instructeurs actifs
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {
                          exercises
                            .map((exercise: any) => exercise.user.id)
                            .filter(
                              (value: any, index: any, self: any) =>
                                self.indexOf(value) === index
                            ).length
                        }
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
                      <p className="text-sm text-gray-400">Temps moyen</p>
                      <p className="text-2xl font-medium text-white">
                        {(
                          exercises
                            .map(
                              (exercise: any) => +exercise.data.referenceTime
                            )
                            .reduce(
                              (acc: number, curr: any) =>
                                acc + (curr ? curr : 5),
                              0
                            ) / exercises.length
                        ).toFixed(2)}
                        s
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
                        Difficulté moyenne
                      </p>
                      <p className="text-2xl font-medium text-white">
                        {exercises
                          .map((exercise: any) =>
                            exercise.data.difficulty
                              ? exercise.data.difficulty
                              : 0
                          )
                          .reduce((acc: number, curr: any) => acc + curr, 0) /
                          exercises.length}
                        /61
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Exercices quotidiens */}
                <div className="bg-[#202123] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Exercices quotidiens
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
                          dataKey="exercises"
                          name="Exercices créés"
                          stroke="#009B70"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Difficulté et temps moyen */}
                <div className="bg-[#202123] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-6">
                    Difficulté et temps moyen
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
                          dataKey="difficulty"
                          name="Difficulté moyenne"
                          stroke="#3B82F6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="avgTime"
                          name="Temps moyen (min)"
                          stroke="#DC2626"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Critères populaires */}
              <div className="bg-[#202123] rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-white mb-6">
                  Critères les plus utilisés
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {popularCriteria.map((criteria) => (
                    <div
                      key={criteria.name}
                      className="bg-[#2A2B32] rounded-lg p-4"
                    >
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        {criteria.name}
                      </h4>
                      <p className="text-2xl font-medium text-white">
                        {criteria.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistiques par instructeur */}
              <div className="bg-[#202123] rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-6">
                  Statistiques par instructeur
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#343541]">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Instructeur
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Exercices créés
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Tireurs actifs
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Difficulté moyenne
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                          Résultats totaux
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructorsResults.map((instructor) => (
                        <tr
                          key={instructor.id}
                          className="border-b border-[#343541]"
                        >
                          <td className="px-4 py-3 text-white">
                            {instructor.firstName} {instructor.lastName}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {instructor.exerciseCount}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {instructor.uniqueShooterCount
                              ? instructor.uniqueShooterCount
                              : 0}
                          </td>
                          <td className="px-4 py-3 text-white">
                            {instructor.avgDifficulty}/61
                          </td>
                          <td className="px-4 py-3 text-white">
                            {instructor.resultCount}
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
            <ExerciseHistory exercises={exercises} results={allResults} />
          )}
        </div>
      </div>
    </Layout>
  );
}

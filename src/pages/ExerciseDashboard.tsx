import React, { useContext, useEffect, useState } from "react";
import { useExerciseStore } from "../store/exerciseStore";
import { useAuthStore } from "../store/authStore";
import { Target, Activity, TrendingUp, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../context/Auth.context";

type ExerciceDashboardProps = {
  exercices: any[];
};

export function ExerciseDashboard(props: ExerciceDashboardProps) {
  const { user } = useContext<any>(AuthContext);

  // Calculer les statistiques
  const totalExercises = props.exercices.length;
  const lastWeekExercises = props.exercices.filter(
    (ex) =>
      Date.now() - new Date(ex.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;
  const lastMonthExercises = props.exercices.filter(
    (ex) =>
      Date.now() - new Date(ex.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
  ).length;
  const lastExerciseDate =
    props.exercices.length > 0
      ? new Date(
          Math.max(
            ...props.exercices.map((ex) => new Date(ex.timestamp).getTime())
          )
        ).toLocaleDateString("fr-FR")
      : "Aucun exercice";

  // Données pour le graphique d'évolution
  const exerciseData = props.exercices.map((exercise) => ({
    date: new Date(exercise.timestamp).toLocaleDateString(),
    difficulty: exercise.data.difficulty ? exercise.data.difficulty : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Statistiques globales */}
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
        <div className="bg-[#202123] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Total des exercices
              </h3>
              <p className="text-2xl font-semibold text-white">
                {totalExercises}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Cette semaine
              </h3>
              <p className="text-2xl font-semibold text-white">
                {lastWeekExercises}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Ce mois
              </h3>
              <p className="text-2xl font-semibold text-white">
                {lastMonthExercises}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Dernier exercice
              </h3>
              <p className="text-sm text-white">{lastExerciseDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique d'évolution */}
      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-6">
          Évolution de la difficulté
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exerciseData}>
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
              <Line
                type="monotone"
                dataKey="difficulty"
                stroke="#009B70"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

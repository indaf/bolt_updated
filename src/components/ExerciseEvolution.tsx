import React, { useEffect, useState } from "react";
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
import { Target, Clock, AlertTriangle, Activity } from "lucide-react";
import { getAllExerciseResultsByExerciseId } from "../services/ExerciseResults/exerciseResults.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

interface ExerciseEvolutionProps {
  exercise: any;
}

const COLORS = [
  "#009B70",
  "#DC002B",
  "#4C51BF",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777",
  "#2563EB",
  "#DC2626",
  "#0891B2",
];

export function ExerciseEvolution({ exercise }: ExerciseEvolutionProps) {
  const [results, setResults] = useState<Array<any>>([]);
  const [selectedShooterIds, setSelectedShooterIds] = useState<string[]>([]);
  const [averagePoints, setAveragePoints] = useState<number>(0);
  const [averageTime, setAverageTime] = useState<number>(0);
  const [uniqueShooters, setUniqueShooters] = useState<number>(0);
  const [shooters, setShooters] = useState<Array<any>>([]);

  useEffect(() => {
    if (exercise) {
      loadExerciseResults();
    }
  }, []);

  const loadExerciseResults = () => {
    getAllExerciseResultsByExerciseId(exercise.id)
      .then((response: AxiosResponse) => {
        setResults(response.data);
        setUniqueShooters(
          new Set(response.data.map((r: any) => r.shooter)).size
        );
        setShooters(
          Array.from(new Set(response.data.map((r: any) => r.shooter.id))).map(
            (id) => response.data.find((r: any) => r.shooter.id === id).shooter
          )
        );
      })
      .catch((error) => {
        console.error(error);
        notifyError("Impossible de récupérer les résultats de l'exercice");
      });
  };

  useEffect(() => {
    if (results.length === 0) return;
    setAverageTime(
      results.reduce((acc, result) => acc + +result.data.time, 0) /
        results.length
    );
  }, [results]);

  // Préparer les données pour les graphiques
  const chartData = results
    .reduce((acc: any[], result) => {
      const existingEntry = acc.find(
        (entry) => entry.timestamp === result.timestamp
      );
      if (existingEntry) {
        existingEntry[`points_${result.shooter.id}`] =
          parseInt(result.data.points) || 0;
        existingEntry[`time_${result.shooter.id}`] =
          parseFloat(result.data.time) || 0;
        existingEntry[`miss_${result.shooter.id}`] =
          parseInt(result.data.miss) || 0;
        existingEntry[`stress_${result.shooter.id}`] =
          parseInt(result.data.stress) || 0;
      } else {
        const newEntry = {
          timestamp: result.timestamp,
          [`points_${result.shooter.id}`]: parseInt(result.data.points) || 0,
          [`time_${result.shooter.id}`]: parseFloat(result.data.time) || 0,
          [`miss_${result.shooter.id}`]: parseInt(result.data.miss) || 0,
          [`stress_${result.shooter.id}`]: parseInt(result.data.stress) || 0,
        };
        acc.push(newEntry);
      }
      return acc;
    }, [])
    .sort((a, b) => a.timestamp - b.timestamp);

  const handleShooterToggle = (shooterId: string) => {
    setSelectedShooterIds((prev) =>
      prev.includes(shooterId)
        ? prev.filter((id) => id !== shooterId)
        : [...prev, shooterId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-[#343541] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#009B70]/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Moyenne des points</p>
              <p className="text-xl font-medium text-white">
                {averagePoints.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#343541] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Temps moyen</p>
              <p className="text-xl font-medium text-white">
                {averageTime.toFixed(1)}s
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#343541] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Participants</p>
              <p className="text-xl font-medium text-white">{uniqueShooters}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sélection des tireurs */}
      <div className="bg-[#343541] rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Sélectionner les tireurs
        </h3>
        <div className="flex flex-wrap gap-2">
          {shooters
            .filter((shooter): any =>
              results.some((r) => r.shooter.id === shooter.id)
            )
            .map((shooter, index) => (
              <button
                key={shooter.id}
                onClick={() => handleShooterToggle(shooter.id)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm transition-colors
                  ${
                    selectedShooterIds.includes(shooter.id)
                      ? "bg-[#009B70] text-white"
                      : "bg-[#2A2B32] text-gray-400 hover:text-white"
                  }
                `}
                style={{
                  borderColor: COLORS[index % COLORS.length],
                  borderWidth: selectedShooterIds.includes(shooter.id)
                    ? "2px"
                    : "0px",
                }}
              >
                {shooter.first_name} {shooter.last_name}
              </button>
            ))}
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points */}
        <div className="bg-[#343541] rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Évolution des points
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis stroke="#6B7280" tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#202123",
                    border: "1px solid #343541",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Legend />
                {selectedShooterIds.map((shooterId, index) => {
                  const shooter = shooters.find((s) => s.id === shooterId);
                  if (!shooter) return null;
                  return (
                    <Line
                      key={shooterId}
                      type="monotone"
                      dataKey={`points_${shooterId}`}
                      name={`${shooter.first_name} ${shooter.last_name}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temps */}
        <div className="bg-[#343541] rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Évolution du temps
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis stroke="#6B7280" tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#202123",
                    border: "1px solid #343541",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Legend />
                {selectedShooterIds.map((shooterId, index) => {
                  const shooter = shooters.find((s) => s.id === shooterId);
                  if (!shooter) return null;
                  return (
                    <Line
                      key={shooterId}
                      type="monotone"
                      dataKey={`time_${shooterId}`}
                      name={`${shooter.first_name} ${shooter.last_name}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Miss */}
        <div className="bg-[#343541] rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Évolution des miss
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis stroke="#6B7280" tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#202123",
                    border: "1px solid #343541",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Legend />
                {selectedShooterIds.map((shooterId, index) => {
                  const shooter = shooters.find((s) => s.id === shooterId);
                  if (!shooter) return null;
                  return (
                    <Line
                      key={shooterId}
                      type="monotone"
                      dataKey={`miss_${shooterId}`}
                      name={`${shooter.first_name} ${shooter.last_name}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stress */}
        <div className="bg-[#343541] rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Évolution du stress ressenti
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280" }}
                  domain={[0, 10]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#202123",
                    border: "1px solid #343541",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Legend />
                {selectedShooterIds.map((shooterId, index) => {
                  const shooter = shooters.find((s) => s.id === shooterId);
                  if (!shooter) return null;
                  return (
                    <Line
                      key={shooterId}
                      type="monotone"
                      dataKey={`stress_${shooterId}`}
                      name={`${shooter.first_name} ${shooter.last_name}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

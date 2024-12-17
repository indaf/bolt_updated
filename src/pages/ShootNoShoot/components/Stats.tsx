import React from "react";
import { ArrowLeft } from "lucide-react";
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

interface StatsProps {
  results: Array<any>;
  onBack: () => void;
}

export function Stats({ results, onBack }: StatsProps) {
  const chartData = results.map((result, _) => ({
    index: result.id,
    accuracy: (
      (result.data.correct / (result.data.correct + result.data.incorrect)) *
      100
    ).toFixed(1),
    reactionTime: result.data.averageReactionTime.toFixed(2),
    missedThreats: result.data.missedThreats,
    falseAlarms: result.data.falseAlarms,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Évolution des performances
        </h2>

        <div className="space-y-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="index"
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
                  stroke="#009B70"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="reactionTime"
                  name="Temps de réaction (s)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
                <XAxis
                  dataKey="index"
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
                  dataKey="missedThreats"
                  name="Menaces manquées"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="falseAlarms"
                  name="Fausses alertes"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

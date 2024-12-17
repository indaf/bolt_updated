import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Exercise } from '../types/exercise';
import { Shooter } from '../types/shooter';

interface EvolutionChartProps {
  exercises: Exercise[];
  shooters: Shooter[];
  selectedShooterIds: string[];
}

const CRITERIA = [
  { id: 'gesture', label: 'Gestuelle', type: 'boolean' },
  { id: 'sequence', label: 'Séquence de tir', type: 'points' },
  { id: 'miss', label: 'Miss', type: 'points' },
  { id: 'out', label: 'Out', type: 'points' },
  { id: 'time', label: 'Temps', type: 'number' },
  { id: 'points', label: 'Points', type: 'points' },
  { id: 'difficulty', label: 'Difficulté', type: 'points' }
];

const COLORS = [
  '#009B70', '#DC002B', '#4C51BF', '#D97706', '#059669',
  '#7C3AED', '#DB2777', '#2563EB', '#DC2626', '#0891B2'
];

export function EvolutionChart({ exercises, shooters, selectedShooterIds }: EvolutionChartProps) {
  const [selectedCriterion, setSelectedCriterion] = useState('points');

  const chartData = useMemo(() => {
    // On prend l'exercice sélectionné (le dernier de la liste)
    const selectedExercise = exercises[exercises.length - 1];
    if (!selectedExercise) return [];

    // On crée un tableau pour stocker les données de chaque passage
    const data: any[] = [];

    // Pour chaque tireur sélectionné
    selectedShooterIds.forEach(shooterId => {
      const shooter = shooters.find(s => s.id === shooterId);
      if (!shooter) return;

      const attempts = shooter.results[selectedExercise.id];
      if (!attempts || !Array.isArray(attempts)) return;

      // Pour chaque tentative du tireur
      attempts.forEach((attempt, index) => {
        // Si ce passage n'existe pas encore, on le crée
        if (!data[index]) {
          data[index] = {
            passage: index + 1,
          };
        }

        // On traite la valeur selon le type de critère
        let value = attempt[selectedCriterion];
        if (selectedCriterion === 'gesture') {
          value = value === 'yes' ? 1 : 0;
        } else if (selectedCriterion === 'points' || selectedCriterion === 'difficulty') {
          value = parseInt(value) || 0;
        } else if (selectedCriterion === 'time') {
          value = parseFloat(value) || 0;
        }

        // On ajoute la valeur pour ce tireur à ce passage
        data[index][`${shooter.firstName} ${shooter.lastName}`] = value;
      });
    });

    return data;
  }, [exercises, shooters, selectedShooterIds, selectedCriterion]);

  const selectedShooters = shooters.filter(shooter => selectedShooterIds.includes(shooter.id));

  const getYDomain = () => {
    switch (selectedCriterion) {
      case 'points':
        return [0, 30];
      case 'gesture':
        return [0, 1];
      case 'difficulty':
        return [1, 5];
      case 'sequence':
        return [0, 10];
      case 'miss':
      case 'out':
        return [-2, 10];
      default:
        return ['auto', 'auto'];
    }
  };

  const formatYAxis = (value: number) => {
    if (selectedCriterion === 'gesture') {
      return value === 1 ? 'Oui' : 'Non';
    }
    return value;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          value={selectedCriterion}
          onChange={(e) => setSelectedCriterion(e.target.value)}
          className="px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                   text-white focus:outline-none focus:border-[#009B70]"
        >
          {CRITERIA.map(criterion => (
            <option key={criterion.id} value={criterion.id}>
              {criterion.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#343541" />
            <XAxis 
              dataKey="passage" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{ value: 'Passage', position: 'insideBottom', offset: -5, fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={getYDomain()}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#202123',
                border: '1px solid #343541',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: any) => {
                if (selectedCriterion === 'gesture') {
                  return [value === 1 ? 'Oui' : 'Non'];
                }
                return [value];
              }}
              labelFormatter={(label) => `Passage ${label}`}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            {selectedShooters.map((shooter, index) => (
              <Line
                key={shooter.id}
                type="monotone"
                dataKey={`${shooter.firstName} ${shooter.lastName}`}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
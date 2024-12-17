import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface UserResultsProps {
  sortBy: 'recent' | 'best';
}

const demoResults = [
  { id: 1, score: 85, time: 4.1, accuracy: 92, date: '2024-03-15' },
  { id: 2, score: 78, time: 3.9, accuracy: 88, date: '2024-03-14' },
  { id: 3, score: 92, time: 4.3, accuracy: 95, date: '2024-03-13' },
];

export function UserResults({ sortBy }: UserResultsProps) {
  const sortedResults = [...demoResults].sort((a, b) => {
    if (sortBy === 'best') {
      return b.score - a.score;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Mes Résultats</h2>
        <p className="text-gray-400">Historique de vos performances</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meilleur score</p>
              <p className="text-xl font-medium text-white">
                {Math.max(...sortedResults.map(r => r.score))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meilleur temps</p>
              <p className="text-xl font-medium text-white">
                {Math.min(...sortedResults.map(r => r.time))}s
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#202123] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#009B70]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#009B70]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Précision moyenne</p>
              <p className="text-xl font-medium text-white">
                {Math.round(sortedResults.reduce((acc, r) => acc + r.accuracy, 0) / sortedResults.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedResults.map((result) => (
          <div
            key={result.id}
            className="bg-[#202123] rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {new Date(result.date).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Score</p>
                    <p className="text-lg font-medium text-[#009B70]">{result.score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Temps</p>
                    <p className="text-lg font-medium text-[#009B70]">{result.time}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Précision</p>
                    <p className="text-lg font-medium text-[#009B70]">{result.accuracy}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
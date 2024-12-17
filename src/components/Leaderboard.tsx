import React from 'react';
import { Trophy, Medal, Clock } from 'lucide-react';

interface LeaderboardProps {
  sortBy: 'recent' | 'best';
}

const demoData = [
  { id: 1, name: 'John Doe', score: 95, time: 4.2, date: '2024-03-15' },
  { id: 2, name: 'Jane Smith', score: 88, time: 3.8, date: '2024-03-14' },
  { id: 3, name: 'Mike Johnson', score: 82, time: 4.5, date: '2024-03-13' },
];

export function Leaderboard({ sortBy }: LeaderboardProps) {
  const sortedData = [...demoData].sort((a, b) => {
    if (sortBy === 'best') {
      return b.score - a.score;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Classement Global</h2>
        <p className="text-gray-400">Les meilleurs scores de tous les joueurs</p>
      </div>

      <div className="space-y-3">
        {sortedData.map((entry, index) => (
          <div
            key={entry.id}
            className="bg-[#202123] rounded-lg p-4 flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#343541] flex items-center justify-center flex-shrink-0">
              {index === 0 ? (
                <Trophy className="w-4 h-4 text-yellow-500" />
              ) : index === 1 ? (
                <Medal className="w-4 h-4 text-gray-400" />
              ) : index === 2 ? (
                <Medal className="w-4 h-4 text-amber-600" />
              ) : (
                <span className="text-sm text-gray-400">{index + 1}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{entry.name}</p>
              <p className="text-sm text-gray-400">{new Date(entry.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-lg font-medium text-[#009B70]">{entry.score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Temps</p>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#009B70]" />
                  <p className="text-lg font-medium text-[#009B70]">{entry.time}s</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
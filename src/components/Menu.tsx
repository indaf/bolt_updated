import React from 'react';
import { LucideIcon, Trophy } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface MenuProps {
  items: MenuItem[];
}

export function Menu({ items }: MenuProps) {
  const topScores = [
    { id: 1, player: "Alex M.", score: 100 },
    { id: 2, player: "Sophie K.", score: 95 },
    { id: 3, player: "Marc D.", score: 90 },
    { id: 4, player: "Julie R.", score: 85 },
    { id: 5, player: "Thomas B.", score: 80 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Adaptive One Training</h1>
        <p className="text-gray-400">Améliorez votre rapidité et votre précision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="bg-[#202123] hover:bg-[#2A2B32] text-white font-medium py-3 px-6 rounded-lg
                     flex items-center gap-3 transition-colors group"
          >
            <item.icon className="w-5 h-5 text-[#009B70] group-hover:text-white transition-colors" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#202123] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-[#009B70]" />
          <h2 className="text-xl font-bold">Top 5 Tireurs</h2>
        </div>
        <div className="space-y-3">
          {topScores.map((score, index) => (
            <div
              key={score.id}
              className="flex items-center justify-between py-2 border-b border-[#343541] last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-6">
                  #{index + 1}
                </span>
                <span className="font-medium text-white">
                  {score.player}
                </span>
              </div>
              <span className="font-bold text-[#009B70]">
                {score.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}</content>
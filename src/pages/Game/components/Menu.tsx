import React from "react";
import { Trophy } from "lucide-react";

type MenuScoreProps = {
  scores: Array<any>;
};

export function Menu({ scores }: MenuScoreProps) {
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="bg-[#202123] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-[#009B70]" />
          <h2 className="text-xl font-bold">Top 5 Tireurs</h2>
        </div>
        <div className="space-y-3">
          {scores.slice(0, 5).map((score, index) => (
            <div
              key={score.id}
              className="flex items-center justify-between py-2 border-b border-[#343541] last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-6">
                  #{index + 1}
                </span>
                <span className="font-medium text-white">
                  {score.user.first_name} {score.user.last_name}
                </span>
              </div>
              <span className="font-bold text-[#009B70]">{score.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Target, Star, TrendingUp, Clock } from 'lucide-react';
import { useProfileStore } from '../store/profileStore';

interface ProfileStatsProps {
  userId: string;
}

export function ProfileStats({ userId }: ProfileStatsProps) {
  const { profiles } = useProfileStore();
  const profile = profiles[userId];

  if (!profile) return null;

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Statistiques</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Target className="w-4 h-4" />
            <span>Exercices complétés</span>
          </div>
          <span className="text-white font-medium">{profile.stats.exercisesCompleted}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Star className="w-4 h-4" />
            <span>Score moyen</span>
          </div>
          <span className="text-white font-medium">{profile.stats.averageScore}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Meilleur score</span>
          </div>
          <span className="text-white font-medium">{profile.stats.bestScore}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Temps total</span>
          </div>
          <span className="text-white font-medium">
            {Math.floor(profile.stats.totalTime / 3600)}h
          </span>
        </div>
      </div>
    </div>
  );
}
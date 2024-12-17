import React from "react";
import { useProfileStore } from "../store/profileStore";
import { ICON_ACHIEVEMENTS } from "../const/ACHIEVEMENT.const";

interface ProfileAchievementsProps {
  profile: any;
}

export function ProfileAchievements({ profile }: ProfileAchievementsProps) {
  if (!profile) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-yellow-500";
      case "epic":
        return "text-purple-500";
      case "rare":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {profile.user.achievements.map((achievement: any) => (
        <div key={achievement.id} className="bg-[#202123] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#343541] flex items-center justify-center">
              <span className="text-2xl">
                {
                  ICON_ACHIEVEMENTS.filter(
                    (achievement_icon: any) =>
                      achievement_icon.type == achievement.icon
                  )[0].icon
                }
              </span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">
                {achievement.title}
              </h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
              <p
                className={`text-xs mt-1 ${getRarityColor(achievement.rarity)}`}
              >
                {achievement.rarity.charAt(0).toUpperCase() +
                  achievement.rarity.slice(1)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

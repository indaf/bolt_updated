import React from "react";
import { Trophy } from "lucide-react";

interface ExperienceBarProps {
  level?: number;
}

export function ExperienceBar({ level = 1 }: ExperienceBarProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-[#009B70]">
      <Trophy className="w-3 h-3" />
      <span>Niv. {level}</span>
    </div>
  );
}

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ICON_ACHIEVEMENTS } from "../const/ACHIEVEMENT.const";

interface AchievementsCarouselProps {
  achievements: Array<{
    id: string;
    title: string;
    icon: string;
    rarity: string;
  }>;
}

export function AchievementsCarousel({
  achievements,
}: AchievementsCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative -mt-12 mb-8">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-[#202123]/80 rounded-full text-white hover:bg-[#202123] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-16 mt-[75px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex-shrink-0 w-30 h-30 bg-[#202123] rounded-lg p-4 flex flex-col items-center justify-center gap-2"
          >
            <span
              className={`text-2xl ${
                achievement.rarity === "legendary"
                  ? "text-yellow-500"
                  : achievement.rarity === "epic"
                  ? "text-purple-500"
                  : achievement.rarity === "rare"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {
                ICON_ACHIEVEMENTS.filter(
                  (achievement_icon: any) =>
                    achievement_icon.type == achievement.icon
                )[0].icon
              }
            </span>
            <div className="text-center">
              <p className="text-sm text-white font-medium truncate">
                {achievement.title}
              </p>
              <p
                className={`text-xs ${
                  achievement.rarity === "legendary"
                    ? "text-yellow-500"
                    : achievement.rarity === "epic"
                    ? "text-purple-500"
                    : achievement.rarity === "rare"
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                {achievement.rarity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-[#202123]/80 rounded-full text-white hover:bg-[#202123] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

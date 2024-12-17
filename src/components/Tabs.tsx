import React from "react";
import { DifficultyBar } from "./DifficultyBar";

interface Tab {
  id: string;
  title: string;
  isSpecial?: boolean;
  difficulty?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-col md:flex-row space-x-1 bg-[#242424] p-1 rounded-lg mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            group flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200
            ${
              activeTab === tab.id
                ? tab.isSpecial
                  ? "bg-[#DC002B] text-white [&_*]:text-white [&_.bg-[#DC002B]]:bg-white [&_span]:text-white [&_svg]:text-white [&_svg]:fill-white"
                  : "bg-[#009B70] text-white"
                : tab.isSpecial
                ? "text-[#DC002B] border border-[#DC002B] hover:bg-[#DC002B] hover:text-white group-hover:[&_*]:text-white group-hover:[&_.bg-[#DC002B]]:bg-white hover:[&_span]:text-white hover:[&_svg]:text-white hover:[&_svg]:fill-white"
                : "text-gray-400 hover:text-white hover:bg-[#2C2C2C]"
            }
          `}
        >
          <div className="flex flex-col items-center justify-center">
            {tab.title}
            {tab.difficulty !== undefined && (
              <div className="mt-2">
                <DifficultyBar difficulty={tab.difficulty} maxPoints={61} />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

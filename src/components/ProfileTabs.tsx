import React from "react";
import { FileText, Medal, Crosshair, Info } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    {
      id: "posts",
      label: "Publications",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "achievements",
      label: "Médailles",
      icon: <Medal className="w-4 h-4" />,
    },
    { id: "setup", label: "Setup", icon: <Crosshair className="w-4 h-4" /> },
    {
      id: "settings",
      label: "Plus d'informations",
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors text-sm
            ${
              activeTab === tab.id
                ? "bg-[#009B70] text-white"
                : "bg-[#202123] text-gray-400 hover:text-white"
            }
          `}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

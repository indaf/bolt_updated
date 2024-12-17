import React from "react";
import { Lock, Globe } from "lucide-react";

interface CourseSectionsProps {
  activeSection: "public" | "private";
  onSectionChange: (section: "public" | "private") => void;
}

export function CourseSections({
  activeSection,
  onSectionChange,
}: CourseSectionsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSectionChange("public")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-colors flex-1
          ${
            activeSection === "public"
              ? "bg-[#009B70] text-white"
              : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
          }
        `}
      >
        <Globe className="w-4 h-4" />
        Public
      </button>
      <button
        onClick={() => onSectionChange("private")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-colors flex-1
          ${
            activeSection === "private"
              ? "bg-[#009B70] text-white"
              : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
          }
        `}
      >
        <Lock className="w-4 h-4" />
        Privé
      </button>
    </div>
  );
}

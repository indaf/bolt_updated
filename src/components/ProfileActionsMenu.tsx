import React from "react";
import { Flag, Ban } from "lucide-react";

interface ProfileActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileActionsMenu({
  isOpen,
  onClose,
}: ProfileActionsMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-[#202123] rounded-lg shadow-lg py-1 z-50">
      <button
        onClick={() => {
          // Implémenter la logique de signalement
          onClose();
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2B32]"
      >
        <Flag className="w-4 h-4" />
        Signaler
      </button>
      <button
        onClick={() => {
          // Implémenter la logique de blocage
          onClose();
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-[#2A2B32]"
      >
        <Ban className="w-4 h-4" />
        Bloquer
      </button>
    </div>
  );
}

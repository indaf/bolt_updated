import React, { useState } from "react";
import { X } from "lucide-react";

interface AddFolderModalProps {
  currentArborescence: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; is_private: boolean }) => void;
  activeSection: "public" | "private";
}

export function AddFolderModal({
  currentArborescence,
  isOpen,
  onClose,
  onAdd,
  activeSection,
}: AddFolderModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      is_private: activeSection === "private",
    });

    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bebas tracking-wider text-white mb-6">
          Nouveau dossier {activeSection === "private" ? "privé" : "public"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nom du dossier
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              placeholder="Entrez le nom du dossier..."
              required
            />
            <p className="text-xs text-gray-400/50 mt-1 italic">
              Le chemin du dossier sera : {currentArborescence}/{name}
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

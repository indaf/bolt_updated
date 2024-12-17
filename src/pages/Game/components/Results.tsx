import React from "react";
import { X } from "lucide-react";

interface ResultsProps {
  shots: number[];
  scoreFinal: number;
  expectedSequence: number[];
  onClose: () => void;
}

export function Results({
  shots,
  expectedSequence,
  onClose,
  scoreFinal,
}: ResultsProps) {
  // Early return if props are invalid
  if (!Array.isArray(shots) || !Array.isArray(expectedSequence)) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#202123] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#343541]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#009B70]">Résultats</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-400 mb-2">Votre séquence :</p>
            <div className="flex gap-3 text-lg">
              {shots.map((shot, i) => (
                <span
                  key={i}
                  className={`
                    ${
                      shot === expectedSequence[i]
                        ? "text-green-400"
                        : "text-red-400"
                    }
                    font-bold bg-[#343541] rounded-lg px-3 py-1
                  `}
                >
                  {shot}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-400 mb-2">Séquence attendue :</p>
            <div className="flex gap-3 text-lg">
              {expectedSequence.map((num, i) => (
                <span
                  key={i}
                  className="font-bold bg-[#343541] rounded-lg px-3 py-1 text-white"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-xl text-gray-300">Score de la manche</p>
            <p className="text-4xl font-bold text-[#009B70]">{scoreFinal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

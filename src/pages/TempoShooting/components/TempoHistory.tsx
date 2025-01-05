import React from "react";
import { ArrowLeft, Clock, Target, Activity } from "lucide-react";

interface TempoHistoryProps {
  onBack: () => void;
  results: Array<any>;
}

export function TempoHistory({ onBack, results }: TempoHistoryProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Historique des sessions
        </h2>

        <div className="space-y-4">
          {results.map((session) => (
            <div key={session.id} className="bg-[#2A2B32] rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#009B70]" />
                  <div>
                    <p className="text-xs text-gray-400">Tempo</p>
                    <p className="text-sm font-medium text-white">
                      {session.data.tempo} BPM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#009B70]" />
                  <div>
                    <p className="text-xs text-gray-400">Précision</p>
                    <p className="text-sm font-medium text-white">
                      {session.score}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#009B70]" />
                  <div>
                    <p className="text-xs text-gray-400">Battements réussis</p>
                    <p className="text-sm font-medium text-white">
                      {session.data.completedBeats}/32
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(session.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(session.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

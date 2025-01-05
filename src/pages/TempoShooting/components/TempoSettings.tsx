import React, { useState, useRef } from "react";
import { Play, Volume2, Square } from "lucide-react";
import { TempoControls } from "./TempoControls";
import { TempoSettings as Settings } from "../types";
import { useSound } from "../hooks/useSound";

interface TempoSettingsProps {
  onStart: (settings: any) => void;
}

export function TempoSettings({ onStart }: TempoSettingsProps) {
  const [settings, setSettings] = useState<Settings>({
    mode: "fixed",
    initialTempo: 120,
    countdownDuration: 3,
  });

  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const previewIntervalRef = useRef<NodeJS.Timeout>();
  const { isSoundEnabled, toggleSound, playMetronomeSound } = useSound();

  const togglePreview = () => {
    if (isPreviewPlaying) {
      if (previewIntervalRef.current) {
        clearInterval(previewIntervalRef.current);
      }
      setIsPreviewPlaying(false);
    } else {
      playMetronomeSound();
      previewIntervalRef.current = setInterval(() => {
        playMetronomeSound();
      }, (60 / settings.initialTempo) * 1000);
      setIsPreviewPlaying(true);
    }
  };

  // Nettoyer l'intervalle lors du démontage
  React.useEffect(() => {
    return () => {
      if (previewIntervalRef.current) {
        clearInterval(previewIntervalRef.current);
      }
    };
  }, []);

  // Mettre à jour l'intervalle quand le tempo change
  React.useEffect(() => {
    if (isPreviewPlaying) {
      if (previewIntervalRef.current) {
        clearInterval(previewIntervalRef.current);
      }
      previewIntervalRef.current = setInterval(() => {
        playMetronomeSound();
      }, (60 / settings.initialTempo) * 1000);
    }
  }, [settings.initialTempo, isPreviewPlaying, playMetronomeSound]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-xl font-medium text-white mb-6">Configuration</h2>

        <div className="space-y-6">
          <TempoControls settings={settings} onSettingsChange={setSettings} />

          <div className="flex items-center justify-between p-4 bg-[#2A2B32] rounded-lg">
            <div className="text-sm text-gray-400">Prévisualiser le tempo</div>
            <button
              onClick={togglePreview}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#343541] text-white rounded-lg hover:bg-[#3E3F4B] transition-colors"
            >
              {isPreviewPlaying ? (
                <>
                  <Square className="w-4 h-4" />
                  Arrêter
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  Écouter
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => {
              if (previewIntervalRef.current) {
                clearInterval(previewIntervalRef.current);
                setIsPreviewPlaying(false);
                toggleSound();
              }
              onStart(settings);
            }}
            className="w-full px-4 py-3 bg-[#009B70] text-white rounded-lg
                     hover:bg-[#007B56] transition-colors text-lg font-medium
                     flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Commencer l'entraînement
          </button>
        </div>
      </div>
    </div>
  );
}

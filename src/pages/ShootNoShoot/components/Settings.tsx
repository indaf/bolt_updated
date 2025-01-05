import React, { useEffect, useState } from "react";
import { GameSettings } from "..";
import { Clock, Target, Filter, Hash, Users } from "lucide-react";

interface SettingsProps {
  onStart: (settings: GameSettings) => void;
  tags: any[];
}

export function Settings({ onStart, tags }: SettingsProps) {
  const [settings, setSettings] = useState<GameSettings>({
    timeLimit: 2,
    threatRatio: 50,
    imagesCount: 20,
    tags: tags.map((tag) => tag.id),
  });

  useEffect(() => {
    if (tags.length > 0) {
      setSettings((prev) => ({
        ...prev,
        tags: tags.map((tag) => tag.id),
      }));
    }
  }, [tags]);

  const handleFilterChange = (id: number) => {
    if (settings.tags.includes(id)) {
      setSettings((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== id),
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        tags: [...prev.tags, id],
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#202123] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne gauche */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#009B70]" />
                <h3 className="text-lg font-medium text-white">
                  Temps de réaction
                </h3>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={settings.timeLimit}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    timeLimit: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-[#009B70]"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>0.5s</span>
                <span className="text-[#009B70] font-bold">
                  {settings.timeLimit}s
                </span>
                <span>4.0s</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#009B70]" />
                <h3 className="text-lg font-medium text-white">
                  Ratio de menaces
                </h3>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="10"
                value={settings.threatRatio}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    threatRatio: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-[#009B70]"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>10%</span>
                <span className="text-[#009B70] font-bold">
                  {settings.threatRatio}%
                </span>
                <span>90%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-[#009B70]" />
                <h3 className="text-lg font-medium text-white">
                  Nombre d'images
                </h3>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="20"
                value={settings.imagesCount}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    imagesCount: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-[#009B70]"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>20</span>
                <span className="text-[#009B70] font-bold">
                  {settings.imagesCount}
                </span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            <div>
              {[...new Set(tags.map((tag: any) => tag.group))].map((group) => (
                <>
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <Filter className="w-5 h-5 text-[#009B70]" />
                    <h3 className="text-lg font-medium text-white">{group}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tags
                      .filter((tag: any) => tag.group == group)
                      .map((tag) => (
                        <label
                          key={tag.id}
                          className="flex items-center bg-[#2A2B32] p-2 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={settings.tags.includes(tag.id)}
                            onChange={() => handleFilterChange(tag.id)}
                            className="rounded border-gray-700 text-[#009B70] focus:ring-[#009B70]"
                          />
                          <span className="ml-2 text-sm text-gray-300">
                            {tag.name}
                          </span>
                        </label>
                      ))}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#343541]">
          <button
            onClick={() => onStart(settings)}
            className="w-full px-4 py-3 bg-[#009B70] text-white rounded-lg
                     hover:bg-[#007B56] transition-colors text-lg font-medium"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}

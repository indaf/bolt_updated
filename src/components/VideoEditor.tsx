import React, { useState } from 'react';
import { Video, Upload, X } from 'lucide-react';

interface VideoEditorProps {
  videoUrl: string;
  onUpdate: (url: string) => void;
}

export function VideoEditor({ videoUrl, onUpdate }: VideoEditorProps) {
  const [url, setUrl] = useState(videoUrl);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(url);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="relative aspect-video bg-black">
        <video
          className="w-full h-full"
          controls
          src={videoUrl}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 p-2 bg-[#2A2B32] rounded-lg text-gray-300 hover:text-white"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#2A2B32] rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            URL de la vidéo
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 bg-[#343541] border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            placeholder="https://example.com/video.mp4"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-[#009B70] text-white rounded-lg
                     hover:bg-[#007B56] transition-colors"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
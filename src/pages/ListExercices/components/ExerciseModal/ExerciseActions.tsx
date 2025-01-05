import React from 'react';
import { Heart, MessageSquare, Share2, Star, Upload, Music, Download, Printer } from 'lucide-react';

interface ExerciseActionsProps {
  onValidate: () => void;
  onFavorite: () => void;
  onComment: () => void;
  onShare: () => void;
  onRate: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

export function ExerciseActions({ 
  onValidate, 
  onFavorite, 
  onComment, 
  onShare, 
  onRate,
  onDownload,
  onPrint 
}: ExerciseActionsProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="grid grid-cols-5 gap-4">
        <button 
          onClick={onValidate}
          className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Star className="w-5 h-5 text-green-600" />
          </div>
          <span>Valider</span>
        </button>

        <button 
          onClick={onFavorite}
          className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <span>Favoris</span>
        </button>

        <button 
          onClick={onComment}
          className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <span>Commenter</span>
        </button>

        <button 
          onClick={onShare}
          className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-purple-600" />
          </div>
          <span>Partager</span>
        </button>

        <button 
          onClick={onRate}
          className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <span>Noter</span>
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
          <Music className="w-4 h-4" />
          <span>Audio Soundcloud</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
          <Upload className="w-4 h-4" />
          <span>Upload photo</span>
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Send, AtSign, Hash } from 'lucide-react';
import { createPublication } from '../../services/Publication/publication.service';
import { notifyError, notifySuccess } from '../../helpers/Notify.helper';

interface TextPostCreatorProps {
  refreshPublication: () => void;
  onCancel: () => void;
}

export function TextPostCreator({ refreshPublication, onCancel }: TextPostCreatorProps) {
  const [mainText, setMainText] = useState('');
  const [description, setDescription] = useState('');
  const MAX_LENGTH = 140;

  const handleSubmit = async () => {
    if (!mainText.trim()) return;

    try {
      await createPublication({
        content: mainText,
        description: description,
        type: 'text'
      });
      notifySuccess('Publication créée avec succès');
      refreshPublication();
      onCancel();
    } catch (error) {
      console.error(error);
      notifyError('Erreur lors de la création de la publication');
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview du post */}
      <div className="aspect-square bg-white rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="w-full text-center">
            <p className="text-black text-3xl font-bold break-words line-clamp-3">
              {mainText || "Votre texte apparaîtra ici"}
            </p>
          </div>
        </div>
        <textarea
          value={mainText}
          onChange={(e) => setMainText(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Cliquez pour écrire votre message..."
          className="absolute inset-0 opacity-0 cursor-text resize-none p-8"
          style={{ WebkitTextFillColor: 'transparent' }}
        />
      </div>

      <div className="flex justify-end">
        <span className="text-sm text-gray-500">
          {mainText.length}/{MAX_LENGTH}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => setDescription(prev => prev + '@')}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#343541] rounded-lg transition-colors"
            title="Mentionner quelqu'un"
          >
            <AtSign className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDescription(prev => prev + '#')}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#343541] rounded-lg transition-colors"
            title="Ajouter un hashtag"
          >
            <Hash className="w-5 h-5" />
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ajoutez une description, des #hashtags ou @mentionnez des personnes..."
          className="w-full px-4 py-2 bg-[#2A2B32] border border-[#343541] rounded-lg
                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70] resize-none h-20"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={!mainText.trim()}
          className="px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
                   flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Publier
        </button>
      </div>
    </div>
  );
}
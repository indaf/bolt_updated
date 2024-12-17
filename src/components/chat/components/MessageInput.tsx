import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function MessageInput({ value, onChange, onSubmit }: MessageInputProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex gap-2 relative">
      <div className="flex-1 flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                   text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-2 text-gray-400 hover:text-white transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-[#009B70] text-white rounded-lg text-sm
                 hover:bg-[#007B56] transition-colors flex items-center gap-2"
        disabled={!value.trim()}
      >
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">Envoyer</span>
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onChange(value + emojiData.emoji);
              setShowEmojiPicker(false);
            }}
            autoFocusSearch={false}
            theme="dark"
            searchPlaceHolder="Rechercher un emoji..."
            width={300}
            height={400}
          />
        </div>
      )}
    </form>
  );
}
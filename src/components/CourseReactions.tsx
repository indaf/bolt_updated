import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Heart, Star, Plus } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Reaction } from "../types/course";

interface CourseReactionsProps {
  reactions: Record<string, Reaction>;
  onReact: (emoji: string) => void;
  onShare: () => void;
  shares: number;
}

const QUICK_REACTIONS = ["👍", "❤️", "⭐", "👏", "☺"];

export function CourseReactions({
  reactions,
  onReact,
  onShare,
  shares,
}: CourseReactionsProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onReact(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {QUICK_REACTIONS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            className={`
              p-2 rounded-lg transition-colors
              ${
                reactions[emoji]?.users.length
                  ? "bg-[#009B70] text-white"
                  : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
              }
            `}
          >
            <span className="text-lg">{emoji}</span>
            {reactions[emoji]?.users.length > 0 && (
              <span className="ml-1 text-xs">
                {reactions[emoji].users.length}
              </span>
            )}
          </button>
        ))}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#2A2B32]"
          >
            <Plus className="w-4 h-4" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
                theme="dark"
                searchPlaceHolder="Rechercher un emoji..."
                width={300}
                height={400}
              />
            </div>
          )}
        </div>
      </div>

      <div className="h-6 w-px bg-[#343541]" />

      <button
        onClick={onShare}
        className="flex items-center gap-1 px-3 py-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#2A2B32]"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm">{shares}</span>
      </button>
    </div>
  );
}

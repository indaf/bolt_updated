import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

interface MessageProps {
  message: any;
  currentUserId: string;
  onReactionClick: (messageId: string, emoji: string) => void;
}

export function Message({ message, currentUserId, onReactionClick }: MessageProps) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const isOwnMessage = message.userId === currentUserId;

  return (
    <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-300">
          {message.userName}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>

      <div className="relative group">
        <div className={`
          max-w-[80%] rounded-lg px-3 py-2 text-sm
          ${isOwnMessage
            ? 'bg-[#009B70] text-white'
            : 'bg-[#343541] text-gray-300'
          }
        `}>
          {message.content}
        </div>

        <button
          onClick={() => setShowReactionPicker(true)}
          className="absolute -right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 
                   hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Smile className="w-4 h-4" />
        </button>

        {showReactionPicker && (
          <div className="absolute bottom-full mb-2 right-0 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                onReactionClick(message.id, emojiData.emoji);
                setShowReactionPicker(false);
              }}
              autoFocusSearch={false}
              theme="dark"
              searchPlaceHolder="Rechercher un emoji..."
              width={300}
              height={400}
            />
          </div>
        )}

        {Object.entries(message.reactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(message.reactions).map(([emoji, reaction]: [string, any]) => (
              <button
                key={emoji}
                onClick={() => onReactionClick(message.id, emoji)}
                className={`
                  px-2 py-0.5 rounded-full text-sm
                  ${reaction.users.includes(currentUserId)
                    ? 'bg-[#009B70]/20 text-[#009B70]'
                    : 'bg-[#343541] text-gray-400 hover:text-white'
                  }
                `}
              >
                {emoji} {reaction.users.length}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { memo } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  comment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

export const PostActions = memo(function PostActions({
  isLiked,
  likesCount,
  onLike,
  comment,
  onCommentChange,
  onCommentSubmit,
}: PostActionsProps) {
  return (
    <div className="p-4 border-t border-[#343541]">
      <div className="flex items-center gap-4 mb-4 ">
        <button
          onClick={onLike}
          className={`text-2xl pc  ${
            isLiked ? "text-red-500" : "text-gray-400 hover:text-white"
          }`}
        >
          <Heart className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white pc">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
      <p className="font-medium text-white mb-2 pc">
        {likesCount} {likesCount === 1 ? "like" : "likes"}
      </p>

      <form onSubmit={onCommentSubmit} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="flex-1 bg-[#2A2B32] border border-[#343541] rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
});

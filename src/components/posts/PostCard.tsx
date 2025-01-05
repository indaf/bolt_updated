import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical } from 'lucide-react';
import { UserAvatar } from '../UserAvatar';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { addLike } from '../../services/Like/like.service';
import { addComment } from '../../services/Comment/comment.service';
import { savePost, unsavePost } from '../../services/Publication/publication.service';
import { notifyError } from '../../helpers/Notify.helper';
import { PostOptionsMenu } from './PostOptionsMenu';

interface PostCardProps {
  post: any;
  currentUserId: string;
  refreshPublication: () => void;
}

export function PostCard({ post, currentUserId, refreshPublication }: PostCardProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like: any) => like.user === currentUserId)
  );
  const [isSaved, setIsSaved] = useState(post.saved_by?.includes(currentUserId));
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    addLike({ publication_id: post.id })
      .then(() => {
        setIsLiked(!isLiked);
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du like");
      });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment({ publication_id: post.id, text: newComment })
      .then(() => {
        setNewComment("");
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du commentaire");
      });
  };

  const handleSave = () => {
    const action = isSaved ? unsavePost : savePost;
    action(post.id)
      .then(() => {
        setIsSaved(!isSaved);
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'enregistrement de la publication");
      });
  };

  const handleUnfollow = () => {
    notifyError("Fonctionnalité en cours de développement");
  };

  const handleReport = () => {
    notifyError("Fonctionnalité en cours de développement");
  };

  const firstLiker = post.likes[0]?.user_info;
  const otherLikesCount = post.likes.length - 1;

  return (
    <div className="bg-[#202123] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar user={post.user} size="sm" />
          <span className="font-medium text-white">
            {post.user.first_name} {post.user.last_name}
          </span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="text-gray-400 hover:text-white p-2"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showOptions && (
            <PostOptionsMenu
              userId={post.user.id}
              onClose={() => setShowOptions(false)}
              onUnfollow={handleUnfollow}
              onReport={handleReport}
            />
          )}
        </div>
      </div>

      {/* Media */}
      {post.medias && post.medias.length > 0 && (
        <div className="aspect-square bg-black">
          <img
            src={import.meta.env.VITE_SERVICE_API_URL + post.medias[0].url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`${isLiked ? "text-red-500" : "text-white hover:text-gray-300"}`}
            >
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-gray-300">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-gray-300">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className={`${isSaved ? "text-[#009B70]" : "text-white hover:text-gray-300"}`}
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Likes */}
        {post.likes.length > 0 && (
          <div className="text-white mb-2">
            {firstLiker && (
              <>
                Aimé par <span className="font-semibold">{firstLiker.first_name} {firstLiker.last_name}</span>
                {otherLikesCount > 0 && (
                  <> et <span className="font-semibold">{otherLikesCount} autres personnes</span></>
                )}
              </>
            )}
          </div>
        )}

        {/* Description */}
        {post.content && (
          <div className="mb-2">
            <span className="text-white">
              <span className="font-semibold mr-2">
                {post.user.first_name} {post.user.last_name}
              </span>
              {post.content}
            </span>
          </div>
        )}

        {/* Comments */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-gray-400 text-sm mb-2"
          >
            Afficher les {post.comments.length} commentaires
          </button>
        )}

        {showAllComments && (
          <div className="space-y-2 mb-4">
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="text-white">
                <span className="font-semibold mr-2">
                  {comment.user.first_name} {comment.user.last_name}
                </span>
                {comment.text}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-gray-400 text-xs uppercase mb-4">
          {formatDistanceToNow(post.created_at, {
            addSuffix: true,
            locale: fr,
          })}
        </div>

        {/* Comment input */}
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 bg-[#2A2B32] border border-[#343541] rounded-lg px-3 py-2
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56]
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publier
          </button>
        </form>
      </div>
    </div>
  );
}
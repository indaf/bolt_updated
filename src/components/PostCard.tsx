import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
} from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { addLike } from "../services/Like/like.service";
import { addComment } from "../services/Comment/comment.service";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { PostOptionsMenu } from "./posts/PostOptionsMenu";
import {
  createPublication,
  updatePublicationById,
} from "../services/Publication/publication.service";
import { addFriend, removeFriend } from "../services/Friend/friend.service";
import { AxiosResponse } from "axios";
import { ReportModal } from "./ReportModal";
import { createReport } from "../services/Report/report.service";

interface PostCardProps {
  post: any;
  currentUserId: string;
  currentUserProfile: any;
  refreshPublication: () => void;
}

export function PostCard({
  post,
  currentUserId,
  currentUserProfile,
  refreshPublication,
}: PostCardProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(
    post?.likes.some((like: any) => like.user === currentUserId)
  );
  const [isSaved, setIsSaved] = useState(
    post?.saved_by?.some((save: any) => save.id === currentUserId)
  );
  const [showOptions, setShowOptions] = useState(false);
  const [reportModalIsOpen, setReportModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setIsLiked(post?.likes.some((like: any) => like.user === currentUserId));
      setIsSaved(
        post?.saved_by?.some((save: any) => save.id === currentUserId)
      );
    }
  }, [post]);
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

  const handleBookmark = () => {
    updatePublicationById(post.id, {
      saved_by: currentUserId,
    })
      .then((_: AxiosResponse) => {
        refreshPublication();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de mettre à jour la publication");
      });
  };

  const handleUnfollow = () => {
    removeFriend(post.user.id)
      .then((_: AxiosResponse) => {
        refreshPublication();
        notifySuccess("Abonnement supprimé");
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de ne plus suivre cet utilisateur");
      });
  };

  const handleFollow = () => {
    addFriend({ friend: post.user.id })
      .then((_: AxiosResponse) => {
        refreshPublication();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de suivre cet utilisateur");
      });
  };

  const handleReport = (reason: string) => {
    createReport({ reason: reason, user: post.user.id, post: post.id })
      .then((_: AxiosResponse) => {
        setReportModalIsOpen(false);
        refreshPublication();
        notifySuccess(
          "Votre signalement a été envoyé. Merci de votre vigilance."
        );
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Erreur lors du signalement de la publication, veuillez réessayer"
        );
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    notifySuccess("Lien copié dans le presse-papier");
  };

  const firstLiker = post?.likes[0]?.user;
  const otherLikesCount = post?.likes.length - 1;

  return (
    <div className="bg-[#202123] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar user={post?.user} size="sm" />
          <span className="font-medium text-white">
            {post?.user.first_name} {post?.user.last_name}
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
              userId={post?.user.id}
              onClose={() => setShowOptions(false)}
              onUnfollow={handleUnfollow}
              onFollow={handleFollow}
              isFriend={
                currentUserProfile?.user?.user_friends?.filter(
                  (friend: any) => friend.friend === post?.user.id
                ).length > 0
              }
              onReport={() => setReportModalIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Media */}
      {post?.medias && post?.medias.length > 0 && (
        <div className="aspect-square bg-black">
          <img
            src={import.meta.env.VITE_SERVICE_API_URL + post?.medias[0].url}
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
              className={`${
                isLiked ? "text-red-500" : "text-white hover:text-gray-300"
              }`}
            >
              <Heart className="w-6 h-6" />
            </button>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              className="text-white hover:text-gray-300"
              onClick={copyToClipboard}
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={handleBookmark}
            className={`${
              isSaved ? "text-[#009B70]" : "text-white hover:text-gray-300"
            }`}
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Likes */}
        {post?.likes.length > 0 && (
          <div className="text-white mb-2">
            {firstLiker && (
              <>
                Aimé par{" "}
                <span className="font-semibold">
                  {firstLiker.first_name} {firstLiker.last_name}
                </span>
                {otherLikesCount > 0 && (
                  <>
                    {" "}
                    et{" "}
                    <span className="font-semibold">
                      {otherLikesCount} autres personnes
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Description */}
        {post?.content && (
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
        {post?.comments.length > 0 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-gray-400 text-sm mb-2"
          >
            Afficher les {post.comments.length} commentaires
          </button>
        )}

        {showAllComments && (
          <div className="space-y-2 mb-4">
            {post?.comments.map((comment: any) => (
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
      <ReportModal
        isOpen={reportModalIsOpen}
        onClose={() => setReportModalIsOpen(false)}
        onConfirm={handleReport}
      />
    </div>
  );
}

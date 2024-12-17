import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { addLike } from "../services/Like/like.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";
import { AddCommentModal } from "./AddCommentModal";
import { addComment } from "../services/Comment/comment.service";

interface PostCardProps {
  post: any;
  currentUserId: string;
  refreshPublication: () => void;
}

export function PostCard({
  post,
  currentUserId,
  refreshPublication,
}: PostCardProps) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [modalCommentIsOpen, setModalCommentIsOpen] = useState<boolean>(false);

  const handleLike = () => {
    addLike({ publication_id: post.id })
      .then((_: AxiosResponse) => {
        refreshPublication();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du like");
      });
  };

  const handleComment = () => {
    setModalCommentIsOpen(true);
  };

  const handleCreateComment = (text: string) => {
    addComment({ publication_id: post.id, text: text })
      .then((_) => {
        setModalCommentIsOpen(false);
        refreshPublication();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du commentaire");
      });
  };

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      {/* En-tête du post */}
      <div className="flex items-center gap-3 mb-4">
        {post.user.avatar && <UserAvatar user={post.user} showStatus />}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">
              {post.user.first_name} {post.user.last_name}
            </span>
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(post.created_at, {
                addSuffix: true,
                locale: fr,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu du post */}
      <p className="text-gray-300 mb-4">{post.content}</p>

      {/* Médias */}
      {post.medias && post.medias.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.medias.map((media: any, index: number) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {media.type === "image" ? (
                <img
                  src={import.meta.env.VITE_SERVICE_API_URL + media.url}
                  alt=""
                  className="w-[150px] h-auto"
                />
              ) : (
                <video
                  src={import.meta.env.VITE_SERVICE_API_URL + media.url}
                  controls
                  className="w-[200px] "
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-400">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 hover:text-white transition-colors ${
            post.likes.filter((like: any) => like.user === currentUserId)
              .length > 0
              ? "text-red-500 hover:text-red-600"
              : ""
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>{post.likes.length}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </button>
        {/* <button className="flex items-center gap-2 hover:text-white transition-colors">
          <Share2 className="w-5 h-5" />
        </button> */}
      </div>

      {/* Commentaires */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-[#343541] space-y-4">
          {post.comments.map((comment: any) => {
            return (
              <div key={comment.id} className="flex gap-3">
                {comment.user.avatar && (
                  <UserAvatar user={comment.user} size="sm" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {comment.user.first_name} {comment.user.last_name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(comment.created_time, {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.text}</p>
                </div>
              </div>
            );
          })}
          <div className="flex w-full">
            <button
              type="submit"
              onClick={handleComment}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              Commenter
            </button>
          </div>
        </div>
      )}
      <AddCommentModal
        isOpen={modalCommentIsOpen}
        onClose={() => setModalCommentIsOpen(false)}
        onConfirm={(text: string) => handleCreateComment(text)}
      ></AddCommentModal>
    </div>
  );
}

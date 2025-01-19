import React, { useState, memo, useRef, useEffect } from "react";
import { Heart, MessageCircle, X } from "lucide-react";
import { formatDistanceToNow, set } from "date-fns";
import { fr } from "date-fns/locale";
import { addLike } from "../../services/Like/like.service";
import { addComment } from "../../services/Comment/comment.service";
import { notifyError } from "../../helpers/Notify.helper";
import { UserAvatar } from "../UserAvatar";
import { PostComment } from "./PostComment";
import { PostActions } from "./PostActions";
import { PostMediaViewer } from "./PostMediaViewer";
import { PostDetailActions } from "./PostDetailActions";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Textarea } from "../common/Textarea";
import { updatePublicationById } from "../../services/Publication/publication.service";
import { formatTagLink } from "../../helpers/TextFormat.helper";

interface PostDetailModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  refreshPublication: () => void;
}

export const PostDetailModal = memo(function PostDetailModal({
  post,
  isOpen,
  onClose,
  currentUserId,
  refreshPublication,
}: PostDetailModalProps) {
  const [comment, setComment] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const isTextPost = !post?.medias?.length && post?.content;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(
    post?.content ? post.content : ""
  );
  const [tags, setTags] = useState<Array<any>>(
    post?.tags ? post.tags.map((tag: any) => tag.name) : []
  );
  const [comIsOpen, setComIsOpen] = useState(false);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (newContent) {
      const hashtagRegex = /#[\S]+/g;
      const foundTags = newContent.match(hashtagRegex);
      setTags(foundTags || []);
    }
  }, [newContent]);

  if (!isOpen || !post) return null;

  const handleLike = () => {
    addLike({ publication_id: post.id })
      .then(() => {
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du like");
      });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment({ publication_id: post.id, text: comment })
      .then(() => {
        setComment("");
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du commentaire");
      });
  };

  const updatePost = () => {
    updatePublicationById(post.id, { content: newContent, tags })
      .then(() => {
        setNewContent("");
        refreshPublication();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Erreur lors de l'ajout du commentaire");
      })
      .finally(() => {
        setIsEdit(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-[#202123] rounded-lg w-full  max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Zone de gauche - Media ou Texte */}
        <div className="w-[100%] lg:w-[60%] bg-black flex items-center justify-center">
          {isTextPost ? (
            <div className="w-full h-full bg-white flex items-center justify-center p-8">
              <p className="text-black text-3xl font-bold text-center break-words">
                {post.content}
              </p>
            </div>
          ) : (
            <PostMediaViewer medias={post.medias} comIsOpen={comIsOpen} />
          )}
        </div>
        <div className="flex mobile items-center pl-4 py-2 gap-4 relative">
          <div className="flex items-center gap-4 mb-2 mobile ">
            <button
              onClick={handleLike}
              className={`text-2xl ${
                false ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className="w-6 h-6" />
            </button>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setComIsOpen(!comIsOpen)}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
          <p className="font-medium text-white mb-2 mobile">
            {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white absolute right-2 top-[25%]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Zone de droite - Infos et commentaires */}
        {comIsOpen && (
          <div className="w-[100%] lg:w-[60%] flex flex-col max-h-[90vh] overflow-y-scroll mobile">
            <div className="p-4 border-b border-[#343541] flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <UserAvatar user={post.user} size="sm" />
                <span className="font-medium text-white">
                  {post.user.first_name} {post.user.last_name}
                </span>
              </div>
              <div className="flex items-center gap-2 ">
                <PostDetailActions
                  post={post}
                  setIsEdit={() => {
                    setNewContent(post?.content ? post.content : "");
                    setIsEdit(!isEdit);
                  }}
                  currentUserId={currentUserId}
                  onClose={onClose}
                  refreshPublication={refreshPublication}
                />
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white pc"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 lg:overflow-y-auto p-4 space-y-4">
              {post.content && (
                <div className="flex gap-3">
                  <UserAvatar user={post.user} size="sm" />
                  <div className="w-full">
                    <span className="font-medium text-white">
                      {post.user.first_name} {post.user.last_name}
                    </span>
                    {isEdit ? (
                      <div className="flex flex-col gap-2 mt-2 bg-gray-">
                        <div className="text-center w-full">
                          <Textarea
                            value={newContent}
                            className="w-full"
                            rows={3}
                            onChange={(event) =>
                              setNewContent(event.target.value)
                            }
                            placeholder="Contenu du post.."
                          />
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          {tags.map((tag: any, idx: number) => (
                            <span key={idx} className="text-[#009B70] text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end items-center gap-4 w-full">
                          <button
                            type="button"
                            onClick={() => setIsEdit(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            Fermer
                          </button>
                          <div className="flex-1" />
                          <button
                            type="submit"
                            onClick={updatePost}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                                            hover:bg-[#007B56] transition-colors"
                          >
                            Confirmer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-300 mt-1">{post.content}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(post.created_at, {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
              )}

              {post.comments.map((comment: any) => (
                <PostComment key={comment.id} comment={comment} />
              ))}
            </div>

            <PostActions
              isLiked={post.likes.some(
                (like: any) => like.user === currentUserId
              )}
              likesCount={post.likes.length}
              onLike={handleLike}
              comment={comment}
              onCommentChange={setComment}
              onCommentSubmit={handleComment}
            />
          </div>
        )}
        <div className="w-[100%] lg:w-[60%] flex flex-col max-h-[90vh] overflow-y-scroll pc">
          <div className="p-4 border-b border-[#343541] flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <UserAvatar user={post.user} size="sm" />
              <span className="font-medium text-white">
                {post.user.first_name} {post.user.last_name}
              </span>
            </div>
            <div className="flex items-center gap-2 ">
              <PostDetailActions
                post={post}
                setIsEdit={() => {
                  setNewContent(post?.content ? post.content : "");
                  setIsEdit(!isEdit);
                }}
                currentUserId={currentUserId}
                onClose={onClose}
                refreshPublication={refreshPublication}
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 lg:overflow-y-auto p-4 space-y-4">
            {post.content && (
              <div className="flex gap-3">
                <UserAvatar user={post.user} size="sm" />
                <div className="w-full">
                  <span className="font-medium text-white">
                    {post.user.first_name} {post.user.last_name}
                  </span>
                  {isEdit ? (
                    <div className="flex flex-col gap-2 mt-2 bg-gray-">
                      <div className="text-center w-full">
                        <Textarea
                          value={newContent}
                          className="w-full"
                          rows={3}
                          onChange={(event) =>
                            setNewContent(event.target.value)
                          }
                          placeholder="Contenu du post.."
                        />
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        {tags.map((tag: any, idx: number) => (
                          <span key={idx} className="text-[#009B70] text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end items-center gap-4 w-full">
                        <button
                          type="button"
                          onClick={() => setIsEdit(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          Fermer
                        </button>
                        <div className="flex-1" />
                        <button
                          type="submit"
                          onClick={updatePost}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                                           hover:bg-[#007B56] transition-colors"
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="text-gray-300 mt-1"
                      dangerouslySetInnerHTML={{ __html: formatTagLink(post) }}
                    ></p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(post.created_at, {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
              </div>
            )}

            {post.comments.map((comment: any) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
          </div>

          <PostActions
            isLiked={post.likes.some(
              (like: any) => like.user === currentUserId
            )}
            likesCount={post.likes.length}
            onLike={handleLike}
            comment={comment}
            onCommentChange={setComment}
            onCommentSubmit={handleComment}
          />
        </div>
      </div>
    </div>
  );
});

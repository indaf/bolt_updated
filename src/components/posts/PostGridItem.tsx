import React, { memo } from "react";
import {
  Image as ImageIcon,
  MessageCircle,
  Heart,
  PinIcon,
} from "lucide-react";
import { TextPostDisplay } from "./TextPostDisplay";

interface PostGridItemProps {
  post: any;
  onClick: () => void;
}

export const PostGridItem = memo(function PostGridItem({
  post,
  onClick,
}: PostGridItemProps) {
  const isTextPost = !post.medias?.length && post.content;

  return (
    <div
      className="relative aspect-square group cursor-pointer bg-[#202123]"
      onClick={onClick}
    >
      {isTextPost ? (
        <TextPostDisplay text={post.content} />
      ) : (
        post.medias?.[0] && (
          <>
            {post.pinned && (
              <PinIcon className="absolute top-2 right-2 w-5 h-5 rotate-45 text-white" />
            )}
            {post.medias?.[0].type === "video" ? (
              <video
                src={import.meta.env.VITE_SERVICE_API_URL + post.medias[0].url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={import.meta.env.VITE_SERVICE_API_URL + post.medias[0].url}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {post.medias.length > 1 && (
              <div className="absolute top-2 right-2">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </>
        )
      )}

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="flex items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <span className="text-lg font-semibold">{post.likes.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">
              {post.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

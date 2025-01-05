import React, { memo, useEffect } from "react";
import { PostGridItem } from "./PostGridItem";
import { PostDetailModal } from "./PostDetailModal";

interface PostGridProps {
  posts: any[];
  currentUserId: string;
  refreshPublication: () => void;
}

export const PostGrid = memo(function PostGrid({
  posts,
  currentUserId,
  refreshPublication,
}: PostGridProps) {
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null);

  useEffect(() => {
    if (!selectedPost) return;

    if (selectedPost) {
      setSelectedPost(posts.find((post) => post.id === selectedPost.id));
    }
  }, [posts]);

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {posts
          .sort((a: any, b: any) => (a.pinned == true ? -1 : 1))
          .map((post) => (
            <PostGridItem
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
      </div>

      <PostDetailModal
        post={selectedPost}
        isOpen={selectedPost}
        onClose={() => setSelectedPost(null)}
        currentUserId={currentUserId}
        refreshPublication={refreshPublication}
      />
    </>
  );
});

import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { NewPost } from "./NewPost";
import { PostGrid } from "./posts/PostGrid";

interface ProfilePostsProps {
  profile: any;
  loadUserProfile: () => void;
}

export function ProfilePosts({ profile, loadUserProfile }: ProfilePostsProps) {
  const { user } = useContext<any>(AuthContext);

  if (!profile) return null;

  const isOwnProfile = user.id === profile.user.id;

  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <div className="bg-[#202123] rounded-lg p-6">
          <NewPost userId={user.id} refreshPublication={loadUserProfile} />
        </div>
      )}

      <PostGrid
        posts={profile.user.publications.sort(
          (a: any, b: any) => b.created_at - a.created_at
        )}
        currentUserId={user.id}
        refreshPublication={loadUserProfile}
      />
    </div>
  );
}

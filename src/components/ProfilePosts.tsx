import React, { useContext, useState } from "react";
import {
  ImageIcon,
  Video,
  Send,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { AuthContext } from "../context/Auth.context";
import { NewPost } from "./NewPost";
import { PostCard } from "./PostCard";

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
          <NewPost
            userId={user.id}
            refreshPublication={loadUserProfile}
          ></NewPost>
        </div>
      )}

      {profile.user.publications.sort((publicationA: any, publicationB: any) =>
        publicationA.created_at < publicationB.created_at ? +1 : -1
      ).length === 0 ? (
        <div className="bg-[#202123] rounded-lg p-8 text-center">
          <p className="text-gray-400">Aucune publication pour le moment</p>
        </div>
      ) : (
        profile.user.publications.map((post: any) => (
          <PostCard
            post={post}
            currentUserId={user.id}
            refreshPublication={loadUserProfile}
          ></PostCard>
        ))
      )}
    </div>
  );
}

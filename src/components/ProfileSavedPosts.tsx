import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { PostCard } from "./PostCard";
import { getSavedByUser } from "../services/Publication/publication.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

interface ProfileSavedPostsProps {
  profile: any;
  currentUserId: string;
  refreshPublication: () => void;
}

export function ProfileSavedPosts({
  profile,
  currentUserId,
  refreshPublication,
}: ProfileSavedPostsProps) {
  const [savedPosts, setSavedPosts] = useState<Array<any>>([]);
  // Early return if profile or user is not loaded
  if (!profile?.user) {
    return null;
  }

  const loadSavedByUser = () => {
    getSavedByUser()
      .then((response: AxiosResponse) => {
        setSavedPosts(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de charger les publications enregistrées");
      });
  };

  useEffect(() => {
    loadSavedByUser();
  }, []);

  const isOwnProfile = profile.user.id === currentUserId;

  if (!isOwnProfile) {
    return (
      <div className="bg-[#202123] rounded-lg p-8 text-center">
        <Bookmark className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Cette section est privée</p>
      </div>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <div className="bg-[#202123] rounded-lg p-8 text-center">
        <Bookmark className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Aucune publication enregistrée</p>
        <p className="text-sm text-gray-500 mt-2">
          Les publications que vous enregistrez apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {savedPosts.map((post: any) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserProfile={profile}
          currentUserId={currentUserId}
          refreshPublication={refreshPublication}
        />
      ))}
    </div>
  );
}

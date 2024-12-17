import React from "react";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import { MessageSquare, UserPlus, UserMinus } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

interface UserCardProps {
  userId: string;
  compact?: boolean;
}

export function UserCard({ userId, compact = false }: UserCardProps) {
  const { user: currentUser } = useAuthStore();
  const { users } = useAuthStore();
  const { profiles } = useProfileStore();
  const { goToProfile } = useNavigate();

  const user = users.find((u) => u.id === userId);
  const profile = profiles[userId];

  if (!user || !profile || !currentUser) return null;

  const isFriend = profile.friends.includes(currentUser.id);
  const hasPendingRequest = profile.friendRequests.incoming.includes(
    currentUser.id
  );

  const handleProfileClick = () => {
    goToProfile(userId);
  };

  if (compact) {
    return (
      <div
        onClick={handleProfileClick}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2A2B32] cursor-pointer"
      >
        {user.avatar ? (
          <img
            src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#009B70] flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user.first_name[0]}
              {user.last_name[0]}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-white truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-400 truncate">{user.uniqueId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#202123] rounded-lg p-4">
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#009B70] flex items-center justify-center">
            <span className="text-xl font-medium text-white">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white truncate">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-400 truncate">{user.uniqueId}</p>
          {profile.bio && (
            <p className="text-sm text-gray-300 mt-1 truncate">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleProfileClick}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                   hover:bg-[#2A2B32] transition-colors"
        >
          Voir le profil
        </button>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        <button
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${
              isFriend
                ? "bg-red-500 text-white hover:bg-red-600"
                : hasPendingRequest
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-[#343541] text-white hover:bg-[#2A2B32]"
            }
          `}
          disabled={hasPendingRequest}
        >
          {isFriend ? (
            <UserMinus className="w-4 h-4" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

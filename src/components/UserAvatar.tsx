import React from "react";
import { useNavigate } from "../hooks/useNavigate";
import { UserStatusBadge } from "./UserStatusBadge";
import { useChatStore } from "../store/chatStore";

interface UserAvatarProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  onClick?: () => void;
}

export function UserAvatar({
  user,
  size = "md",
  showStatus = false,
  onClick,
}: UserAvatarProps) {
  const { goToProfile } = useNavigate();
  const userPresence = useChatStore((state) =>
    state.userPresence.find((p) => p.userId === user.id)
  );

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      goToProfile(user.id);
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {user.avatar ? (
        <img
          src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className={`${sizeClasses[size]} rounded-full`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-[#009B70] flex items-center justify-center`}
        >
          <span className="font-medium text-white">
            {user.first_name[0]}
            {user.last_name[0]}
          </span>
        </div>
      )}
      {showStatus && userPresence && (
        <UserStatusBadge status={userPresence.status} />
      )}
    </div>
  );
}

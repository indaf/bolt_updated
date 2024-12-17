import React, { useState } from "react";
import {
  MessageSquare,
  UserPlus,
  UserMinus,
  MoreVertical,
  Ear,
  EarOff,
} from "lucide-react";

interface ProfileActionsProps {
  isOwnProfile: boolean;
  isFriend: boolean;
  isMuted: boolean;
  hasPendingRequest: boolean;
  onMessage: () => void;
  onFriendAction: () => void;
  onSourdineAction: () => void;
}

export function ProfileActions({
  isOwnProfile,
  isFriend,
  hasPendingRequest,
  onMessage,
  onFriendAction,
  onSourdineAction,
  isMuted,
}: ProfileActionsProps) {
  const [showMenu, setShowMenu] = useState(false);

  if (isOwnProfile) return null;

  return (
    <div className="flex items-center gap-2">
      {/* <button
        onClick={onMessage}
        className="p-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
      >
        <MessageSquare className="w-5 h-5" /> TODO
      </button> */}

      <button
        onClick={onFriendAction}
        disabled={hasPendingRequest}
        className={`
          p-2 rounded-lg transition-colors
          ${
            isFriend
              ? "bg-red-500 text-white hover:bg-red-600"
              : hasPendingRequest
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-[#343541] text-white hover:bg-[#2A2B32]"
          }
        `}
      >
        {isFriend ? (
          <UserMinus className="w-5 h-5" />
        ) : (
          <UserPlus className="w-5 h-5" />
        )}
      </button>
      {isFriend && (
        <button
          onClick={onSourdineAction}
          className={`
            p-2 rounded-lg transition-colors
            ${
              !isMuted == true
                ? "bg-red-500 text-white hover:bg-red-600"
                : hasPendingRequest
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-[#343541] text-white hover:bg-[#2A2B32]"
            }
          `}
        >
          {isMuted ? (
            <Ear className="w-5 h-5" />
          ) : (
            <EarOff className="w-5 h-5" />
          )}
        </button>
      )}

      {/* <button
        onClick={() => setShowMenu(true)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      > TODO
        <MoreVertical className="w-5 h-5" />
      </button> */}

      {/* <ProfileActionsMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      /> */}
    </div>
  );
}

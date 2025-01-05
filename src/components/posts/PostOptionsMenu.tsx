import { UserMinus, Flag, User, X, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostOptionsMenuProps {
  userId: string;
  onClose: () => void;
  onUnfollow: () => void;
  onReport: () => void;
  onFollow: () => void;
  isFriend: boolean;
}

export function PostOptionsMenu({
  userId,
  onClose,
  onUnfollow,
  onReport,
  onFollow,
  isFriend,
}: PostOptionsMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-[#2A2B32] rounded-lg shadow-lg py-1 z-50">
      <button
        onClick={() => {
          navigate(`/profile/${userId}`);
          onClose();
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
      >
        <User className="w-4 h-4" />
        Voir le profil
      </button>
      {isFriend != true && (
        <button
          onClick={() => {
            onFollow();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
        >
          <UserPlus className="w-4 h-4" />
          Suivre
        </button>
      )}
      {isFriend == true && (
        <button
          onClick={() => {
            onUnfollow();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
        >
          <UserMinus className="w-4 h-4" />
          Ne plus suivre
        </button>
      )}

      <button
        onClick={() => {
          onReport();
          onClose();
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#343541]"
      >
        <Flag className="w-4 h-4" />
        Signaler
      </button>

      <button
        onClick={onClose}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
      >
        <X className="w-4 h-4" />
        Annuler
      </button>
    </div>
  );
}

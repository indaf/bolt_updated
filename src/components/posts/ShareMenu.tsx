import React, { memo, useState } from "react";
import { Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { notifySuccess, notifyError } from "../../helpers/Notify.helper";

interface ShareMenuProps {
  postId: number;
  onShare: () => void;
}

export const ShareMenu = memo(function ShareMenu({
  postId,
  onShare,
}: ShareMenuProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform?: string) => {
    const url = `${window.location.origin}/post/${postId}`;

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}`);
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        );
        break;
      case "copy":
        navigator.clipboard
          .writeText(url)
          .then(() => notifySuccess("Lien copié dans le presse-papier"))
          .catch(() => notifyError("Erreur lors de la copie du lien"));
        break;
      default:
        setShowShareMenu(true);
        return;
    }

    setShowShareMenu(false);
    onShare();
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleShare()}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
      >
        <Share2 className="w-4 h-4" />
        Partager sur
      </button>

      {showShareMenu && (
        <div className="absolute right-full top-0 ml-2 w-48 bg-[#2A2B32] rounded-lg shadow-lg py-1">
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            <Link2 className="w-4 h-4" />
            Copier le lien
          </button>
        </div>
      )}
    </div>
  );
});

import React, { memo, useCallback, useState } from "react";
import { Trash2, MoreVertical, Pin, Edit2, Loader } from "lucide-react";
import {
  deletePublication,
  updatePublicationById,
} from "../../services/Publication/publication.service";
import { notifyError, notifySuccess } from "../../helpers/Notify.helper";
import { ShareMenu } from "./ShareMenu";
import { useClickOutside } from "../../hooks/useClickOutside";
import { AxiosResponse } from "axios";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";

interface PostDetailActionsProps {
  post: any;
  currentUserId: string;
  onClose: () => void;
  refreshPublication: () => void;
  setIsEdit?: () => void;
}

export const PostDetailActions = memo(function PostDetailActions({
  post,
  currentUserId,
  onClose,
  setIsEdit,
  refreshPublication,
}: PostDetailActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);

  const isAuthor = post?.user?.id === currentUserId;

  useClickOutside(menuRef, () => {
    if (!isLoading) {
      setShowMenu(false);
    }
  });

  const pinPost = () => {
    updatePublicationById(post.id, { pinned: !post.pinned })
      .then((_: AxiosResponse) => {
        notifySuccess("Publication épinglée avec succès");
        refreshPublication();
      })
      .catch((error: any) => {
        console.error("Error updating publication:", error);
        notifyError("Impossible d'épingler la publication");
      });
  };

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    deletePublication(post.id)
      .then((_: AxiosResponse) => {
        notifySuccess("Publication supprimée avec succès");
        refreshPublication();
        onClose();
      })
      .catch((error: any) => {
        console.error("Error deleting publication:", error);
        notifyError("Erreur lors de la suppression de la publication");
      })
      .finally(() => {
        setIsLoading(false);
        setModalDeleteIsOpen(false);
        setShowMenu(false);
      });
  }, [post?.id, onClose, refreshPublication]);

  // Si l'utilisateur n'est pas l'auteur, ne pas afficher les actions
  if (!isAuthor) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => !isLoading && setShowMenu(!showMenu)}
        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#343541] transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <MoreVertical className="w-5 h-5" />
        )}
      </button>

      {showMenu && !isLoading && (
        <div className="absolute right-0 mt-2 w-48 bg-[#2A2B32] rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={pinPost}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            <Pin className="w-4 h-4" />
            Épingler
          </button>

          <button
            onClick={setIsEdit}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            <Edit2 className="w-4 h-4" />
            Modifier
          </button>

          <ShareMenu postId={post.id} onShare={() => setShowMenu(false)} />

          <div className="h-px bg-[#343541] my-1" />

          <button
            onClick={() => setModalDeleteIsOpen(true)}
            disabled={isLoading}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#343541]"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={modalDeleteIsOpen}
        onClose={() => setModalDeleteIsOpen(false)}
        onConfirm={handleDelete}
        message="Êtes vous sur de vouloir supprimer la publication ?"
        title="Suppression de la publication"
      ></DeleteConfirmationModal>
    </div>
  );
});

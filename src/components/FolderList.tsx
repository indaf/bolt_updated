import React, { useEffect, useState } from "react";
import { Check, Folder, Pencil, Trash2 } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { IoReturnUpBackSharp } from "react-icons/io5";

interface FolderListProps {
  allFolders: any[];
  items: any[];
  onItemSelect: (item: any) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string) => void;
  isAdmin: boolean;
  onDrag: (e: any) => void;
  currentUserId?: string;
  updateDepositDrag: (e: any) => void;
  activeSection: "public" | "private";
  currentFolder: any | null;
  onDragEnd: (e: any) => void;
}

export function FolderList({
  allFolders,
  items,
  onItemSelect,
  onDelete,
  onEdit,
  isAdmin,
  currentUserId,
  activeSection,
  currentFolder,
  onDrag,
  updateDepositDrag,
  onDragEnd,
}: FolderListProps) {
  const filteredItems = items.filter((item) =>
    activeSection === "public" ? !item.is_private : item.is_private
  );
  const [folderOnEdit, setFolderOnEdit] = useState<any | null>(null);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    if (folderOnEdit) {
      setNewName(folderOnEdit.name);
    }
  }, [folderOnEdit]);

  return (
    <div className="space-y-1 mb-1">
      {currentFolder !== null && (
        <div
          onDragEnterCapture={(e) =>
            updateDepositDrag(
              currentFolder.parent == null
                ? "root"
                : allFolders.find(
                    (folder) => folder.id === currentFolder.parent
                  )
            )
          }
          onDragLeaveCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              updateDepositDrag(null);
            }
          }}
          onClick={() =>
            onItemSelect(
              currentFolder.parent == null
                ? null
                : allFolders.find(
                    (folder) => folder.id === currentFolder.parent
                  )
            )
          }
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2A2B32] transition-colors`}
        >
          <IoReturnUpBackSharp className="w-4 h-4" />
          <span className="flex-1 truncate">...</span>
        </div>
      )}
      {filteredItems.map((folder) => (
        <div
          onDragStartCapture={(e) => onDrag(folder)}
          draggable
          onDragEndCapture={onDragEnd}
          onDragEnterCapture={(e) => updateDepositDrag(folder)}
          onDragLeaveCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              updateDepositDrag(null);
            }
          }}
          key={folder.id}
          onClick={() =>
            folderOnEdit?.id == folder?.id ? null : onItemSelect(folder)
          }
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
            folderOnEdit?.id == folder?.id
              ? ""
              : "hover:bg-[#2A2B32] transition-colors"
          } `}
        >
          {folderOnEdit?.id == folder.id ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                      text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                placeholder="Nom du dossier.."
                required
              />
              <Check
                className="w-4 h-4 text-green-500"
                onClick={() => {
                  setFolderOnEdit(null);
                  onEdit(folder.id, newName);
                }}
              />
              <RxCross2
                className="w-4 h-4 text-red-500"
                onClick={() => setFolderOnEdit(null)}
              />
            </>
          ) : (
            <>
              <Folder className="w-4 h-4" />

              <span className="flex-1 truncate">
                {folder.name}
                {folder.is_private && (
                  <span className="ml-2 text-xs text-gray-500">(Privé)</span>
                )}
              </span>
            </>
          )}

          {isAdmin && folderOnEdit?.id != folder.id && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFolderOnEdit(folder);
                }}
                className="p-1 hover:bg-[#343541] rounded transition-colors"
                title="Modifier"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFolderOnEdit(folder);
                }}
                className="p-1 hover:bg-[#343541] rounded transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

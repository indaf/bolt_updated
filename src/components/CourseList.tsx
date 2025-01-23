import React from "react";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { CourseItem } from "../types/course";

interface CourseListProps {
  items: CourseItem[];
  selectedItem: CourseItem | null;
  onItemSelect: (item: CourseItem) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isAdmin: boolean;
  onDrag: (e: any) => void;
  currentUserId?: string;
  activeSection: "public" | "private";
  onDragEnd: (e: any) => void;
}

export function CourseList({
  items,
  selectedItem,
  onItemSelect,
  onDelete,
  onEdit,
  onDrag,
  isAdmin,
  currentUserId,
  activeSection,
  onDragEnd,
}: CourseListProps) {
  const filteredItems = items.filter((item) =>
    activeSection === "public" ? !item.is_private : item.is_private
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item) => (
        <div
          onDragStartCapture={(e) => onDrag(item)}
          draggable
          onDragEndCapture={onDragEnd}
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`
            group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
            hover:bg-[#2A2B32] transition-colors
            ${
              selectedItem?.id === item.id
                ? "bg-[#2A2B32] text-white"
                : "text-gray-400"
            }
          `}
        >
          <FileText className="w-4 h-4" />

          <span className="flex-1 truncate">
            {item.name}
            {item.is_private && (
              <span className="ml-2 text-xs text-gray-500">(Privé)</span>
            )}
          </span>

          {(isAdmin || item?.author?.id === currentUserId) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item.id);
                }}
                className="p-1 hover:bg-[#343541] rounded transition-colors"
                title="Modifier"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
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

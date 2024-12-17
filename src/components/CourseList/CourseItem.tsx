import React, { useState } from 'react';
import { FileText, MoreVertical } from 'lucide-react';
import { CourseItem } from '../../types/course';
import { CourseContextMenu } from '../CourseContextMenu';

interface CourseItemProps {
  item: CourseItem;
  selectedItem: CourseItem | null;
  onItemSelect: (item: CourseItem) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<CourseItem>) => void;
  canEdit: boolean;
}

export function CourseItemComponent({ 
  item,
  selectedItem,
  onItemSelect,
  onDelete,
  onEdit,
  canEdit
}: CourseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (editedName.trim() && editedName !== item.name) {
      onEdit(item.id, { name: editedName.trim() });
    }
    setIsEditing(false);
    setContextMenu(null);
  };

  const handleCancel = () => {
    setEditedName(item.name);
    setIsEditing(false);
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="group relative">
      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
          hover:bg-[#2A2B32] transition-colors
          ${selectedItem?.id === item.id ? 'bg-[#2A2B32] text-white' : 'text-gray-400'}
        `}
        onClick={() => !isEditing && onItemSelect(item)}
        onContextMenu={handleContextMenu}
      >
        <FileText className="w-4 h-4" />
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 px-2 py-1 bg-[#343541] text-white rounded border border-[#009B70] text-sm"
              autoFocus
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <>
            <span className="flex-1 truncate">
              {item.name}
              {item.isPrivate && <span className="ml-2 text-xs text-gray-500">(Privé)</span>}
            </span>

            {canEdit && (
              <button
                onClick={handleContextMenu}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#343541] rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {contextMenu && (
        <CourseContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRename={() => {
            setIsEditing(true);
            setContextMenu(null);
          }}
          onDelete={() => {
            onDelete(item.id);
            setContextMenu(null);
          }}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
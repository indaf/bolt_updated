import React, { useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface CourseContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function CourseContextMenu({ x, y, onRename, onDelete, onClose }: CourseContextMenuProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      onClose();
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      className="fixed z-50 w-48 bg-[#2A2B32] rounded-lg shadow-lg py-1 border border-[#343541]"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRename();
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
      >
        <Pencil className="w-4 h-4" />
        Renommer
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#343541]"
      >
        <Trash2 className="w-4 h-4" />
        Supprimer
      </button>
    </div>
  );
}
import React, { useState, useEffect, useCallback, useRef } from "react";
import { CourseItem } from "../types/course";
import { RichTextEditor } from "./RichTextEditor";
import { Pencil, Save } from "lucide-react";

interface CourseContentProps {
  item: CourseItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: string) => void;
  isAdmin: boolean;
  currentUserId?: string;
}

export function CourseContent({
  item,
  isEditing,
  onEdit,
  onSave,
  isAdmin,
  currentUserId,
}: CourseContentProps) {
  const canEdit = isAdmin || item.author.id === currentUserId;
  const [localContent, setLocalContent] = useState(item.content || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const lastSavedContentRef = useRef(item.content || "");

  // Handle content changes
  const handleContentChange = useCallback((content: string) => {
    setLocalContent(content);
    setHasUnsavedChanges(content !== lastSavedContentRef.current);
  }, []);

  // Manual save handler
  const handleManualSave = useCallback(() => {
    onSave(localContent);
    lastSavedContentRef.current = localContent;
    setHasUnsavedChanges(false);
  }, [localContent, onSave]);

  // Update local content when item changes
  useEffect(() => {
    setLocalContent(item.content || "");
    lastSavedContentRef.current = item.content || "";
    setHasUnsavedChanges(false);
  }, [item.content]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-[#343541] flex items-center justify-between">
        <h2 className="text-lg font-bebas tracking-wider text-white">
          {item.name}
        </h2>
        <div className="flex items-center gap-2">
          {isEditing && hasUnsavedChanges && (
            <button
              onClick={handleManualSave}
              className="px-3 py-1.5 bg-[#009B70] text-white rounded-lg text-sm
                       hover:bg-[#007B56] transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
          )}
          {canEdit && !isEditing && (
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-[#009B70] text-white rounded-lg text-sm
                       hover:bg-[#007B56] transition-colors flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Éditer
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isEditing ? (
          <RichTextEditor
            content={localContent}
            onChange={handleContentChange}
          />
        ) : (
          <div className="prose prose-invert max-w-none">
            {item.content ? (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                <Pencil className="w-8 h-8" />
                <p>
                  Cliquez sur le bouton "Éditer" pour commencer à rédiger votre
                  article
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

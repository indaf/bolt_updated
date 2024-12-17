import React, { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';
import { Send } from 'lucide-react';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';

interface CourseEditorProps {
  onSave: (content: string) => void;
}

export function CourseEditor({ onSave }: CourseEditorProps) {
  const [content, setContent] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave(content);
    setContent('');
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <RichTextEditor
          content={content}
          onChange={setContent}
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56]
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}
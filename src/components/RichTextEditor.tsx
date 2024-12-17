import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import React, { useState } from 'react';
import {
  Bold, Italic, List, ListOrdered, Image as ImageIcon,
  Link as LinkIcon, Video, Heading1, Heading2, Heading3,
  Quote, Code, Undo, Redo, Search
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [commandPalette, setCommandPalette] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4 space-y-1',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: 'rounded-lg overflow-hidden my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#009B70] hover:underline',
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
          class: 'font-bebas tracking-wider',
        },
      }),
      Placeholder.configure({
        placeholder: "Commencez à écrire votre article ici...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[300px] focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const commands = [
    { label: "Titre 1", icon: <Heading1 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "Titre 2", icon: <Heading2 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "Titre 3", icon: <Heading3 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Image", icon: <ImageIcon className="w-4 h-4" />, action: () => {
      const url = window.prompt("URL de l'image:");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }},
    { label: "Vidéo YouTube", icon: <Video className="w-4 h-4" />, action: () => {
      const url = window.prompt("URL YouTube:");
      if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }},
    { label: "Citation", icon: <Quote className="w-4 h-4" />, action: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "Code", icon: <Code className="w-4 h-4" />, action: () => editor.chain().focus().toggleCodeBlock().run() },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(commandInput.toLowerCase())
  );

  return (
    <div className="relative bg-[#343541] rounded-lg overflow-hidden">
      <div className="border-b border-[#4A4B53] mb-4 sticky top-0 bg-[#343541] z-10">
        <div className="flex flex-wrap gap-2 p-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('bold') ? 'bg-[#2A2B32]' : ''}`}
            title="Gras"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('italic') ? 'bg-[#2A2B32]' : ''}`}
            title="Italique"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('bulletList') ? 'bg-[#2A2B32]' : ''}`}
            title="Liste à puces"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('orderedList') ? 'bg-[#2A2B32]' : ''}`}
            title="Liste numérotée"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('heading', { level: 1 }) ? 'bg-[#2A2B32]' : ''}`}
            title="Titre 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('heading', { level: 2 }) ? 'bg-[#2A2B32]' : ''}`}
            title="Titre 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('heading', { level: 3 }) ? 'bg-[#2A2B32]' : ''}`}
            title="Titre 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt("URL du lien:");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 rounded hover:bg-[#2A2B32] ${editor.isActive('link') ? 'bg-[#2A2B32]' : ''}`}
            title="Ajouter un lien"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt("URL de l'image:");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
            className="p-2 rounded hover:bg-[#2A2B32]"
            title="Ajouter une image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt("URL YouTube:");
              if (url) {
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
              }
            }}
            className="p-2 rounded hover:bg-[#2A2B32]"
            title="Ajouter une vidéo YouTube"
          >
            <Video className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-[#2A2B32]"
            title="Annuler"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-[#2A2B32]"
            title="Rétablir"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <EditorContent 
          editor={editor}
          className="min-h-[300px] text-gray-100"
          onKeyDown={(e) => {
            if (e.key === "/" && !commandPalette) {
              e.preventDefault();
              setCommandPalette(true);
              setCommandInput("");
            } else if (e.key === "Escape" && commandPalette) {
              setCommandPalette(false);
            }
          }}
        />
      </div>

      {commandPalette && (
        <div className="absolute bottom-full left-0 w-64 bg-[#2A2B32] rounded-lg shadow-lg border border-[#343541] mb-2">
          <div className="p-2 border-b border-[#343541] flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Rechercher une commande..."
              className="w-full bg-transparent border-none focus:outline-none text-sm"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => {
                  cmd.action();
                  setCommandPalette(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#343541]"
              >
                {cmd.icon}
                {cmd.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
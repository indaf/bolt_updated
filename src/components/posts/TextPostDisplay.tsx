import React from 'react';

interface TextPostDisplayProps {
  text: string;
}

export function TextPostDisplay({ text }: TextPostDisplayProps) {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center p-4">
      <p className="text-black text-lg font-bold text-center break-words line-clamp-4">
        {text}
      </p>
    </div>
  );
}
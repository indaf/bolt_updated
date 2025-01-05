import React from 'react';

interface ExerciseAudioProps {
  embed: string;
}

export function ExerciseAudio({ embed }: ExerciseAudioProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Audio</h3>
      <div className="rounded-lg overflow-hidden">
        <div dangerouslySetInnerHTML={{ __html: embed }} />
      </div>
    </div>
  );
}
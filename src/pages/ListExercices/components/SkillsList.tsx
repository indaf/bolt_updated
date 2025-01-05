import React from 'react';
import { Brain, Target, Shield } from 'lucide-react';

interface Skill {
  name: string;
  description: string;
  image?: string;
}

interface SkillsListProps {
  skills: Skill[];
}

export function SkillsList({ skills }: SkillsListProps) {
  if (skills.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compétences développées</h3>
      <div className="grid gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Brain className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{skill.name}</h4>
                <p className="mt-1 text-sm text-gray-600">{skill.description}</p>
                {skill.image && (
                  <img 
                    src={skill.image} 
                    alt={skill.name}
                    className="mt-3 rounded-md w-full max-w-xs"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  title: string;
  description?: string;
}

export function AppHeader({ title, description }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <button
        onClick={() => navigate("/apps")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux applications</span>
      </button>

      <h1 className="text-2xl font-bebas tracking-wider text-white">{title}</h1>
      {description && <p className="text-gray-400 mt-2">{description}</p>}
    </div>
  );
}

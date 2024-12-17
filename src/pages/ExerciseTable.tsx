import React, { useContext, useState } from "react";
import { Search, Filter, MoreVertical, Archive, Activity } from "lucide-react";
import { useExerciseStore } from "../store/exerciseStore";
import { useAuthStore } from "../store/authStore";
import { ExerciseInstructions } from "../components/ExerciseInstructions";
import { ExerciseResults } from "../components/ExerciseResults";
import { ExerciseStatistics } from "../components/ExerciseStatistics";
import { ExerciseEvolution } from "../components/ExerciseEvolution";
import { AuthContext } from "../context/Auth.context";
import { ToolsContext } from "../context/Tools.context";
import {
  deleteExerciseById,
  updateExerciseById,
} from "../services/Exercise/exercise.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

type ExerciseTableProps = {
  exercises: Array<any>;
  loadExercises: () => void;
};

export function ExerciseTable(props: ExerciseTableProps) {
  const { user } = useContext<any>(AuthContext);
  const { selectedExercise, setSelectedExercise } =
    useContext<any>(ToolsContext);

  const [activeTab, setActiveTab] = useState<
    "instructions" | "results" | "history" | "evolution"
  >("instructions");
  const [contextMenu, setContextMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const filteredExercises = props.exercises
    .filter((ex) => ex.archived === showArchived)
    .filter((ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.timestamp - a.timestamp);

  const selectedExerciseData = props.exercises.find(
    (ex) => ex.id === selectedExercise
  );

  const handleContextMenu = (e: React.MouseEvent, exerciseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      id: exerciseId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleRename = (exerciseId: string) => {
    const exercise = props.exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      setEditingId(exerciseId);
      setEditingName(exercise.name);
    }
    setContextMenu(null);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && editingName.trim()) {
      updateExerciseById(+editingId, { name: editingName })
        .then((_: AxiosResponse) => {
          props.loadExercises();
          setEditingId(null);
          setEditingName("");
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de renommer l'exercice");
        });
    }
  };

  const handleDeleteExercise = (exerciseId: string) => {
    if (exerciseId) {
      deleteExerciseById(+exerciseId)
        .then((_: AxiosResponse) => {
          props.loadExercises();
          setContextMenu(null);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de supprimer l'exercice");
        });
    }
  };

  const handleArchiveExercise = (exerciseId: string) => {
    if (exerciseId) {
      updateExerciseById(+exerciseId, {
        is_archived: props.exercises.find((ex) => ex.id === exerciseId)
          ?.archived
          ? false
          : true,
      })
        .then((_: AxiosResponse) => {
          props.loadExercises();
          setContextMenu(null);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de mettre à jour l'exercice");
        });
    }
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      {/* Liste des exercices */}
      <div className="md:w-72 w-full shrink-0">
        <div className="bg-[#202123] rounded-lg p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un exercice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise.id)}
                className={`
                  relative group h-9 flex items-center px-3 rounded-lg cursor-pointer transition-colors
                  ${
                    selectedExercise === exercise.id
                      ? "border border-[#009B70] bg-transparent text-white"
                      : "text-gray-300 hover:bg-[#343541] hover:text-white"
                  }
                `}
              >
                {editingId === exercise.id ? (
                  <form onSubmit={handleRenameSubmit} className="flex-1">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-1 bg-[#343541] text-white rounded-lg border border-[#009B70] text-sm"
                      autoFocus
                      onBlur={handleRenameSubmit}
                    />
                  </form>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate text-sm">{exercise.name}</span>
                    <button
                      onClick={(e) => handleContextMenu(e, exercise.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-white transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`
              w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${
                showArchived
                  ? "bg-[#DC002B] text-white"
                  : "bg-[#2A2B32] text-gray-400 hover:text-white hover:bg-[#343541]"
              }
            `}
          >
            <Archive className="w-4 h-4" />
            <span>
              {showArchived ? "Voir les exercices actifs" : "Voir les archives"}
            </span>
          </button>
        </div>
      </div>

      {/* Zone de contenu dynamique */}
      <div className="flex-1">
        {selectedExerciseData ? (
          <div className="bg-[#202123] rounded-lg overflow-hidden">
            <div className="flex border-b border-[#343541] flex-col md:flex-row">
              <button
                onClick={() => setActiveTab("instructions")}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeTab === "instructions"
                      ? "bg-[#009B70] text-white rounded-t-lg"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Consignes
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeTab === "results"
                      ? "bg-[#009B70] text-white rounded-t-lg"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Résultats
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeTab === "history"
                      ? "bg-[#009B70] text-white rounded-t-lg"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Historique
              </button>
              <button
                onClick={() => setActiveTab("evolution")}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeTab === "evolution"
                      ? "bg-[#009B70] text-white rounded-t-lg"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Courbes d'évolution
              </button>
            </div>

            <div className="p-6">
              {activeTab === "instructions" && (
                <ExerciseInstructions
                  loadExercises={props.loadExercises}
                  exercise={selectedExerciseData}
                />
              )}
              {activeTab === "results" && (
                <ExerciseResults exercise={selectedExerciseData} />
              )}
              {activeTab === "history" && (
                <ExerciseStatistics exercise={selectedExerciseData} />
              )}
              {activeTab === "evolution" && (
                <ExerciseEvolution exercise={selectedExerciseData} />
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Sélectionnez un exercice dans la liste</p>
          </div>
        )}
      </div>

      {contextMenu && (
        <div
          className="fixed z-50 w-48 bg-[#2A2B32] rounded-lg shadow-lg py-1 border border-[#343541]"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
        >
          <button
            onClick={() => handleRename(contextMenu.id)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            Renommer
          </button>
          <button
            onClick={() => handleArchiveExercise(contextMenu.id)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#343541]"
          >
            {showArchived ? "Désarchiver" : "Archiver"}
          </button>
          <button
            onClick={() => handleDeleteExercise(contextMenu.id)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#343541]"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

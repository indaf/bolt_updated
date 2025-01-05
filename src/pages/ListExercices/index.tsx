import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Layout from "../../components/Layout";
import { FilterBar } from "./components/filters/FilterBar";
import {
  Exercise,
  ExerciseCategory,
  ModuleType,
  WeaponType,
} from "./types/Exercise";
import { useExerciseFilters } from "./hooks/useExerciseFilters";
import { ExerciseGrid } from "./components/exercises/ExerciseGrid";
import { ExerciseModal } from "./components/ExerciseModal";
import { FORMATTED_EXO } from "./data/exercises/formatted_exo";
import { createGameScore } from "../../services/GameScore/gameScore.service";
import { notifyError } from "../../helpers/Notify.helper";
import { AxiosResponse } from "axios";

interface Filters {
  module?: ModuleType;
  category?: ExerciseCategory;
  targetModels: string[];
  weaponType?: WeaponType;
}

export function ListExercice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [allExo, setAllExo] = useState<Array<any>>(
    FORMATTED_EXO.filter((ex) => ex.id != null)
  );
  // Initialiser les filtres avec un tableau vide pour targetModels
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    targetModels: [],
  });

  const { filteredExercises, modules, categories, targetModels, weaponTypes } =
    useExerciseFilters({
      exercises: FORMATTED_EXO.filter((ex) => ex.id != null),
      searchTerm,
      filters: selectedFilters,
    });

  const handleFilterChange = (
    type: keyof Filters,
    value?: string | string[]
  ) => {
    console.log(type, value);
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    if (selectedExercise) {
      const score = {
        data: { exercice_id: selectedExercise.id, name: selectedExercise.name },
        score: 0,
        game: "annuaire",
      };
      createGameScore(score)
        .then((_: AxiosResponse) => {})
        .catch((error) => {
          console.error("Error saving history", error);
          notifyError("Erreur lors de la sauvegarde de l'historique");
        });
    }
  }, [selectedExercise]);

  return (
    <Layout pageTitle="Tempo Shooting">
      <div className="flex flex-col h-full">
        {/* Navigation fixe avec z-index élevé */}
        <div className=" border-b border-[#242424] sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between py-6 flex-col md:flex-row">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                    Exercices de tir
                  </h1>
                  <p className="text-sm text-gray-400">
                    Entraînez-vous avec notre liste d'exercices de tir
                  </p>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un exercice..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    />
                  </div>
                </div>
              </div>
              <FilterBar
                modules={modules}
                categories={categories}
                targetModels={targetModels}
                weaponTypes={weaponTypes}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 text-sm text-gray-400">
              {allExo.length} exercice{allExo.length > 1 ? "s" : ""}
              {allExo.length !== allExo.length && ` sur ${allExo.length}`}
            </div>

            <ExerciseGrid
              exercises={filteredExercises}
              onExerciseClick={setSelectedExercise}
            />
          </div>
        </div>
      </div>
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </Layout>
  );
}

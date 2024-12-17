import React, { useContext, useEffect, useState } from "react";
import { BarChart2, Table, Plus } from "lucide-react";
import { ExerciseForm } from "../components/ExerciseForm";
import { ExerciseTable } from "./ExerciseTable";
import { ExerciseDashboard } from "./ExerciseDashboard";
import Layout from "../components/Layout";
import { AuthContext } from "../context/Auth.context";
import {
  createExercise,
  getUserExercises,
} from "../services/Exercise/exercise.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

type Tab = "dashboard" | "list" | "create";

export function GenerateExercise() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const [generatedExercise, setGeneratedExercise] = useState<string | null>(
    null
  );
  const [exercises, setExercises] = useState<Array<any>>([]);
  const { user } = useContext<any>(AuthContext);

  useEffect(() => {
    if (user) {
      loadExercises();
    }
  }, [user]);

  const loadExercises = () => {
    getUserExercises()
      .then((response: AxiosResponse) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
        notifyError("Impossible de récupérer les exercices");
      });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Connexion requise
            </h2>
            <p className="text-gray-400 text-sm">
              Veuillez vous connecter pour accéder au générateur d'exercice
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleExerciseSaved = (exercice: any) => {
    createExercise(exercice)
      .then((_: AxiosResponse) => {
        loadExercises();
        setActiveTab("list");
      })
      .catch((error) => {
        console.error(error);
        notifyError("Impossible de sauvegarder l'exercice");
      });
  };

  return (
    <Layout pageTitle="Générateur d'exercice">
      <div className="flex flex-col h-full">
        <div className="bg-[#0C0C0C] border-b border-[#242424]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between py-6">
                <div className=" mb-3 md:mb-0">
                  <h1 className="text-2xl font-bebas tracking-wider text-white mb-2">
                    Générateur d'exercice pour la matrice
                  </h1>
                  <p className="text-sm text-gray-400">
                    Créez et gérez vos exercices de tir personnalisés
                  </p>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        activeTab === "dashboard"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <BarChart2 className="w-4 h-4" />
                    Tableau de bord
                  </button>
                  <button
                    onClick={() => setActiveTab("list")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        activeTab === "list"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <Table className="w-4 h-4" />
                    Mes exercices
                  </button>
                  <button
                    onClick={() => setActiveTab("create")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        activeTab === "create"
                          ? "bg-[#009B70] text-white"
                          : "bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]"
                      }
                    `}
                  >
                    <Plus className="w-4 h-4" />
                    Créer un exercice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "dashboard" && (
              <ExerciseDashboard exercices={exercises} />
            )}
            {activeTab === "list" && (
              <ExerciseTable
                loadExercises={loadExercises}
                exercises={exercises}
              />
            )}
            {activeTab === "create" && (
              <ExerciseForm
                onGenerate={setGeneratedExercise}
                onExerciseSaved={handleExerciseSaved}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

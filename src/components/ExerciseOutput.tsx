import React, { useContext } from "react";
import { Plus, Download, Printer } from "lucide-react";
import { exerciseOptions } from "../data/exerciseOptions";
import { exerciseDescriptions } from "../data/exerciseDescriptions";
import { DifficultyBar } from "./DifficultyBar";
import { jsPDF } from "jspdf";
import { AuthContext } from "../context/Auth.context";

interface ExerciseOutputProps {
  exercise: Record<any, any>;
  onSave?: (exercise: any) => void;
}

export function ExerciseOutput({ exercise, onSave }: ExerciseOutputProps) {
  const { user } = useContext<any>(AuthContext);

  const calculateTotalDifficulty = () => {
    let totalPoints = 0;

    Object.entries(exercise).forEach(([key, value]) => {
      const option = exerciseOptions.find((opt) => opt.id === key);
      if (option) {
        const selectedOption = option.options.find(
          (opt) => opt.value === value
        );
        if (selectedOption) {
          totalPoints += selectedOption.difficulty;
        }
      }
    });

    return totalPoints;
  };

  const handleAddExercise = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Veuillez vous connecter pour sauvegarder l'exercice");
      return;
    }

    const timestamp = Date.now();
    const formattedDate = new Date(timestamp).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    exercise.difficulty = calculateTotalDifficulty();
    const exerciseData = {
      name: `Exercice du ${formattedDate}`,
      data: exercise,
    };

    // const newExercise = addExercise(exerciseData, user.id);
    if (onSave) {
      onSave(exerciseData);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = margin;

    // Titre
    doc.setFontSize(16);
    doc.text("Résultat de l'exercice", margin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(
      `Difficulté totale : ${calculateTotalDifficulty()} points`,
      margin,
      yPos
    );
    yPos += 15;

    Object.entries(exercise).forEach(([key, value]) => {
      const option = exerciseOptions.find((opt) => opt.id === key);
      if (!option) return;

      const selectedOption = option.options.find((opt) => opt.value === value);
      if (!selectedOption) return;

      if (yPos > 280) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(14);
      doc.text(`${option.label} : ${selectedOption.label}`, margin, yPos);
      yPos += 8;

      const description = exerciseDescriptions[key]?.[value];
      if (description) {
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(description, 170);
        lines.forEach((line) => {
          if (yPos > 280) {
            doc.addPage();
            yPos = margin;
          }
          doc.text(line, margin, yPos);
          yPos += 5;
        });
        yPos += 5;
      }
    });

    doc.save("exercice.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#202123] rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-white">
              Résultat de l'exercice
            </h2>
            <div className="mt-2">
              <p className="text-sm text-gray-400">
                Difficulté totale : {calculateTotalDifficulty()} points
              </p>
              <div className="mt-1">
                <DifficultyBar
                  difficulty={calculateTotalDifficulty()}
                  maxPoints={61}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                       hover:bg-[#3E3F4B] transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimer
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                       hover:bg-[#3E3F4B] transition-colors"
            >
              <Download className="w-4 h-4" />
              Télécharger PDF
            </button>
            <button
              onClick={handleAddExercise}
              className="flex items-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Sauvegarder
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(exercise).map(([key, value]) => {
            const option = exerciseOptions.find((opt) => opt.id === key);
            if (!option) return null;

            const selectedOption = option.options.find(
              (opt) => opt.value === value
            );
            if (!selectedOption) return null;

            const description = exerciseDescriptions[key]?.[value];

            return (
              <div key={key} className="bg-[#343541] rounded-lg p-4">
                <div className="flex items-baseline">
                  <span className="text-gray-300">{option.label} : </span>
                  <span className="ml-2 text-white font-medium">
                    {selectedOption.label}
                  </span>
                </div>
                {description && (
                  <div className="mt-2 text-sm text-gray-300">
                    {description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { exerciseOptions } from "../data/exerciseOptions";
import { exerciseDescriptions } from "../data/exerciseDescriptions";
import { Exercise } from "../types/exercise";
import { Download, Printer, Clock } from "lucide-react";
import { jsPDF } from "jspdf";
import { useExerciseStore } from "../store/exerciseStore";
import { updateExerciseById } from "../services/Exercise/exercise.service";
import { AxiosResponse, AxiosResponseTransformer } from "axios";
import { notifyError } from "../helpers/Notify.helper";

interface ExerciseInstructionsProps {
  exercise: Exercise;
  loadExercises: () => void;
}

const SECTIONS = {
  setup: {
    title: "Mise en place",
    fields: [
      "distance",
      "targets",
      "shooters",
      "lighting",
      "destabilization",
      "equipment",
      "nvg",
    ],
  },
  shooting: {
    title: "Gestuelle",
    fields: [
      "weapon",
      "bodyPosition",
      "tacticalPosition",
      "shootType",
      "trigger",
      "grip",
      "magChange",
      "incident",
      "weaponTransition",
    ],
  },
  mental: {
    title: "Mental",
    fields: [
      "noAnticipation",
      "alphanumeric",
      "next",
      "back",
      "anchor",
      "counterOrder",
      "marker",
      "irrelevantInfo",
    ],
  },
  physical: {
    title: "Physique",
    fields: ["upperBody", "lowerBody"],
  },
};

export function ExerciseInstructions({
  exercise,
  loadExercises,
}: ExerciseInstructionsProps) {
  const [referenceTime, setReferenceTime] = useState(
    exercise.data.referenceTime || "5.0"
  );
  const timeout = useRef<any>(null);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (exercise.data.referenceTime !== referenceTime) {
        updateExerciseById(+exercise.id, {
          data: {
            ...exercise.data,
            referenceTime,
          },
        })
          .then((_: AxiosResponse) => {
            loadExercises();
            clearTimeout(timeout.current);
          })
          .catch((error: any) => {
            console.error(error);
            notifyError("Impossible de mettre à jour l'exercice");
          });
      }
    }, 1000);
    return () => clearTimeout(timeout.current);
  }, [referenceTime]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = margin;

    // Titre
    doc.setFontSize(16);
    doc.text(exercise.name, margin, yPos);
    yPos += 10;

    // Temps de référence
    doc.setFontSize(12);
    doc.text(`Temps de référence : ${referenceTime}s`, margin, yPos);
    yPos += 15;

    Object.entries(SECTIONS).forEach(([sectionKey, section]) => {
      const sectionFields = section.fields.filter((fieldId) => {
        const value = exercise.data[fieldId];
        return value !== "none" && value !== "aucun";
      });

      if (sectionFields.length > 0) {
        yPos += 10;
        doc.setFontSize(14);
        doc.text(section.title, margin, yPos);
        yPos += 10;

        sectionFields.forEach((fieldId) => {
          const option = exerciseOptions.find((opt) => opt.id === fieldId);
          if (!option) return;

          const value = exercise.data[fieldId];
          const selectedOption = option.options.find(
            (opt) => opt.value === value
          );
          if (!selectedOption) return;

          doc.setFontSize(12);
          doc.text(`${option.label} : ${selectedOption.label}`, margin, yPos);
          yPos += 8;

          const description = exerciseDescriptions[fieldId]?.[value];
          if (description) {
            doc.setFontSize(10);
            const lines = doc.splitTextToSize(description, 170);
            lines.forEach((line: any) => {
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
      }
    });

    doc.save(`${exercise.name}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <Clock className="w-5 h-5 text-[#009B70]" />
            <span className="text-sm text-gray-400">Temps de référence :</span>
            <div className="flex gap-2 items-center justify-center mb-2 md:mb-0">
              <input
                type="number"
                step="0.1"
                min="0"
                value={referenceTime}
                onChange={(e) => setReferenceTime(e.target.value)}
                className="w-20 px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                        text-white text-sm focus:outline-none focus:border-[#009B70]"
              />
              <span className="text-sm text-gray-400">secondes</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
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
        </div>
      </div>

      <div className="space-y-6 bg-[#2A2B32] rounded-lg p-6">
        <div className="print-content">
          <h2>{exercise.name}</h2>

          {Object.entries(SECTIONS).map(([sectionKey, section]) => {
            const sectionFields = section.fields.filter((fieldId) => {
              const value = exercise.data[fieldId];
              return value !== "none" && value !== "aucun";
            });

            if (sectionFields.length === 0) return null;

            return (
              <div key={sectionKey} className="section">
                <h3 className="text-lg font-medium text-[#FE0032] mb-4">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {sectionFields.map((fieldId) => {
                    const option = exerciseOptions.find(
                      (opt) => opt.id === fieldId
                    );
                    if (!option) return null;

                    const value = exercise.data[fieldId];
                    const selectedOption = option.options.find(
                      (opt) => opt.value === value
                    );
                    if (!selectedOption) return null;

                    const description = exerciseDescriptions[fieldId]?.[value];

                    return (
                      <div
                        key={fieldId}
                        className="bg-[#343541] rounded-lg p-4"
                      >
                        <div className="flex items-baseline">
                          <span className="text-gray-300">
                            {option.label} :{" "}
                          </span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

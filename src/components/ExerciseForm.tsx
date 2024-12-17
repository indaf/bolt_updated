import React, { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import { ExerciseOutput } from "./ExerciseOutput";
import { Tabs } from "./Tabs";
import { exerciseOptions } from "../data/exerciseOptions";

interface ExerciseFormProps {
  onGenerate: (exercise: string) => void;
  onExerciseSaved?: (exercice: any) => void;
}

const defaultValues = Object.fromEntries(
  exerciseOptions.map((option) => [option.id, option.options[0].value])
);

export function ExerciseForm({
  onGenerate,
  onExerciseSaved,
}: ExerciseFormProps) {
  const [activeTab, setActiveTab] = useState("setup");
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const calculateTotalDifficulty = () => {
    let totalPoints = 0;

    Object.entries(formData).forEach(([key, value]) => {
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

  const setupFields = [
    "distance",
    "targets",
    "shooters",
    "lighting",
    "destabilization",
    "equipment",
    "nvg",
  ];
  const shootingFields = [
    "weapon",
    "bodyPosition",
    "tacticalPosition",
    "shootType",
    "trigger",
    "grip",
    "weaponTransition",
    "magChange",
    "incident",
  ];
  const mentalFields = [
    "noAnticipation",
    "alphanumeric",
    "next",
    "back",
    "anchor",
    "counterOrder",
    "marker",
    "irrelevantInfo",
  ];
  const physicalFields = ["upperBody", "lowerBody"];

  const getFieldsByTab = (tab: string) => {
    switch (tab) {
      case "setup":
        return setupFields;
      case "shooting":
        return shootingFields;
      case "mental":
        return mentalFields;
      case "physical":
        return physicalFields;
      case "result":
        return [];
      default:
        return [];
    }
  };

  const tabs = [
    { id: "setup", title: "Mise en place" },
    { id: "shooting", title: "Gestuelle" },
    { id: "mental", title: "Mental" },
    { id: "physical", title: "Physique" },
    {
      id: "result",
      title: "Voir l'exercice",
      isSpecial: true,
      difficulty: calculateTotalDifficulty(),
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "result" ? (
        <ExerciseOutput exercise={formData} onSave={onExerciseSaved} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getFieldsByTab(activeTab).map((fieldId) => {
            const option = exerciseOptions.find((opt) => opt.id === fieldId);
            if (!option) return null;

            return (
              <RadioGroup
                key={fieldId}
                label={option.label}
                options={option.options}
                value={formData[fieldId]}
                onChange={(value) => handleChange(fieldId, value)}
                tooltip={option.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

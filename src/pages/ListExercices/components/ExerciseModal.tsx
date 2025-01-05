import React from "react";
import { Exercise } from "../types/Exercise";
import { X, Target, Shield, Star } from "lucide-react";

interface ExerciseModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ExerciseModal({ exercise, onClose }: ExerciseModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#202123] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#202123] p-4 border-b border-[#262626] flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl text-[#009B70] font-bold">
              {exercise.name}
            </h2>
            <span className="bg-yellow-100 text-[#202123] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star className="w-4 h-4" />
              {exercise.module.difficulty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#262626] rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-gray-400">
                Image de l'exercice
              </h3>
              <img
                src={exercise?.images?.drill}
                alt="Exercise drill"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-gray-400">Cible</h3>
              <img
                src={exercise?.images?.target}
                alt="Exercise target"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-400">
                  Objectif
                </h3>
                <p className="text-gray-300">{exercise.objective}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-400">
                  Informations
                </h3>
                <dl className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Direction:</dt>
                    <dd>{exercise.direction}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Cible:</dt>
                    <dd>
                      {exercise.target.name} ({exercise.target.count})
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Arme:</dt>
                    <dd>{exercise.weapon.type}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Position:</dt>
                    <dd>{exercise.weapon.position}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Munitions</h3>
                <dl className="space-y-2">
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Sans contraintes:</dt>
                    <dd>{exercise?.ammunition?.withoutConstraints}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium">Avec contraintes:</dt>
                    <dd>{exercise?.ammunition?.withConstraints}</dd>
                  </div>
                  {exercise?.ammunition?.magazineChangesPA && (
                    <div className="flex items-center gap-2">
                      <dt className="font-medium">Chargeurs PA:</dt>
                      <dd>
                        {exercise?.ammunition?.magazine1PA} +{" "}
                        {exercise?.ammunition?.magazine2PA}
                      </dd>
                    </div>
                  )}
                  {exercise?.ammunition?.magazineChangesFA && (
                    <div className="flex items-center gap-2">
                      <dt className="font-medium">Chargeurs FA:</dt>
                      <dd>
                        {exercise?.ammunition?.magazine1FA} +{" "}
                        {exercise?.ammunition?.magazine2FA}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="space-y-6">
              {exercise?.constraints && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-400">
                    Contraintes
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(exercise.constraints).map(
                      (entry: any, index: any) =>
                        entry[1] && (
                          <li key={index} className="text-gray-300  list-none">
                            <div className="flex flex-col items-start gap-2">
                              <span className="text-gray-600 font-bold">
                                {entry[0]}
                              </span>
                              <span className="text-gray-400 text-sm">
                                {entry[1]}
                              </span>
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}

              {exercise?.skills && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-400">
                    Compétences développées
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(exercise.skills).map(
                      (skill: any, index) =>
                        skill[1] && (
                          <div
                            key={index}
                            className="bg-[#202123] p-4 rounded-lg"
                          >
                            <h4 className="font-medium mb-2">{skill[0]}</h4>
                            <p className="text-sm text-gray-300">{skill[1]}</p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Audio */}
          {exercise.audio && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Audio</h3>
              <div
                dangerouslySetInnerHTML={{ __html: exercise.audio.embed }}
                className="w-full rounded-lg overflow-hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { Plus, Search, User } from "lucide-react";
import { Exercise } from "../types/exercise";
import { calculateScore } from "../utils/scoring";
import { ExerciseScoreCard } from "./ExerciseScoreCard";
import { AuthContext } from "../context/Auth.context";
import { createAccount, searchShooter } from "../services/Auth/Auth.service";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { createExerciseResult } from "../services/ExerciseResults/exerciseResults.service";
import { generateRandomString } from "../helpers/TextFormat.helper";

interface ExerciseResultsProps {
  exercise: Exercise;
}

export function ExerciseResults({ exercise }: ExerciseResultsProps) {
  const { user } = useContext<any>(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [shooters, setShooters] = useState<Array<any>>([]);
  const [showAddShooter, setShowAddShooter] = useState(false);
  const [selectedShooterId, setSelectedShooterId] = useState<any | null>(null);
  const timeoutSearch = useRef<any>(null);
  const [selectedShooter, setSelectedShooter] = useState<any>(null);

  const [newShooter, setNewShooter] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: generateRandomString(8),
    role: "shooter",
  });

  const [formData, setFormData] = useState({
    miss: "",
    out: "",
    time: "",
    score: 0,
    gesture: "yes" as "yes" | "no",
    sequence: "yes" as "yes" | "no",
    stress: "1",
    safety: "yes" as "yes" | "no",
  });

  if (!user) return null;

  useEffect(() => {
    clearTimeout(timeoutSearch.current);
    if (searchTerm) {
      timeoutSearch.current = setTimeout(() => {
        searchShooter(searchTerm)
          .then((response: AxiosResponse) => {
            setShooters(response.data);
            clearTimeout(timeoutSearch.current);
          })
          .catch((error: any) => {
            console.error(error);
            notifyError("Impossible de récupérer les tireurs");
          });
      }, 300);
    } else {
      setShooters([]);
    }
    return () => clearTimeout(timeoutSearch.current);
  }, [searchTerm]);

  const handleAddShooter = (e: React.FormEvent) => {
    e.preventDefault();
    createAccount(newShooter)
      .then((res: AxiosResponse) => {
        notifySuccess("Tireur créé avec succès.");
        const email = newShooter.email;
        setNewShooter({
          first_name: "",
          last_name: "",
          email: "",
          password: generateRandomString(8),
          role: "shooter",
        });
        setShowAddShooter(false);
        searchShooter(email)
          .then((response: AxiosResponse) => {
            setShooters(response.data);
            setSelectedShooterId(res.data.id);
          })
          .catch((error: any) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de créer le tireur");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShooterId) return;

    createExerciseResult({
      exercise: exercise.id,
      shooter: selectedShooterId,
      instructor: user.id,
      data: { ...formData, score: score.total },
    })
      .then((_: AxiosResponse) => {
        notifySuccess("Résultat sauvegardé avec succès");
        setFormData({
          miss: "",
          out: "",
          time: "",
          gesture: "yes",
          sequence: "yes",
          stress: "1",
          safety: "yes",
          score: 0,
        });
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de sauvegarder le résultat");
      });
  };

  useEffect(() => {
    if (selectedShooterId) {
      const shooter = shooters.find(
        (shooter) => shooter.id === selectedShooterId
      );
      if (shooter) {
        setSelectedShooter(shooter);
      }
    }
  }, [selectedShooterId]);

  const score = calculateScore(exercise, {
    miss: parseInt(formData.miss) || 0,
    out: parseInt(formData.out) || 0,
    time: parseFloat(formData.time) || 0,
    gesture: formData.gesture,
    sequence: formData.sequence,
    safety: formData.safety,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un tireur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
        </div>
        <button
          onClick={() => setShowAddShooter(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Créer un tireur
        </button>
      </div>
      {shooters.length > 0 && (
        <select
          value={selectedShooterId}
          onChange={(e) =>
            setSelectedShooterId(e.target.value === "" ? null : e.target.value)
          }
          className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white focus:outline-none focus:border-[#009B70]"
        >
          <option value=""></option>
          {shooters.map((shooter) => (
            <option value={shooter.id}>
              {shooter.first_name} {shooter.last_name}
            </option>
          ))}
        </select>
      )}

      {showAddShooter ? (
        <form onSubmit={handleAddShooter} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={newShooter.first_name}
                onChange={(e) =>
                  setNewShooter((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={newShooter.last_name}
                onChange={(e) =>
                  setNewShooter((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Adresse mail
            </label>
            <input
              type="mail"
              value={newShooter.email}
              onChange={(e) =>
                setNewShooter((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>
          <p className="text-orange-300 border-[1px] text-xs italic border-orange-300 p-4 rounded-xl">
            Un compte utilisateur sera créé pour le tireur associé à l'adresse
            mail. Il pourra réinitialiser le mot de passe pour accéder à
            l'application.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddShooter(false)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              Créer
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedShooter && (
            <div className="flex items-center gap-3 bg-[#2A2B32] p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#009B70] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">
                  {selectedShooter.firstName && selectedShooter.lastName
                    ? selectedShooter.firstName + " " + selectedShooter.lastName
                    : selectedShooter.email}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedShooter.uniqueId}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Miss
              </label>
              <input
                type="number"
                min="0"
                value={formData.miss}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, miss: e.target.value }))
                }
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Out
              </label>
              <input
                type="number"
                min="0"
                value={formData.out}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, out: e.target.value }))
                }
                className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Temps total (secondes)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Respect de la gestuelle
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gesture"
                  value="yes"
                  checked={formData.gesture === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      gesture: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Correct</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gesture"
                  value="no"
                  checked={formData.gesture === "no"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      gesture: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Incorrect</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Respect des consignes
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sequence"
                  value="yes"
                  checked={formData.sequence === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sequence: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Oui</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sequence"
                  value="no"
                  checked={formData.sequence === "no"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sequence: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Non</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Niveau de stress ressenti (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.stress}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, stress: e.target.value }))
              }
              className="w-full accent-[#009B70]"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>1</span>
              <span>Niveau {formData.stress}</span>
              <span>5</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Respect des règles de sécurité
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="safety"
                  value="yes"
                  checked={formData.safety === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      safety: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Oui</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="safety"
                  value="no"
                  checked={formData.safety === "no"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      safety: e.target.value as "yes" | "no",
                    }))
                  }
                  className="text-[#009B70] focus:ring-[#009B70]"
                />
                <span className="text-sm text-gray-300">Non</span>
              </label>
            </div>
          </div>

          <ExerciseScoreCard score={score} showDetails />

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={!selectedShooterId}
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

import React, { useContext, useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Lock,
  User,
  Building,
  Shield,
} from "lucide-react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import {
  deleteAccount,
  updateUser,
  updateUserPassword,
} from "../services/Auth/Auth.service";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AuthContext } from "../context/Auth.context";
import { AxiosResponse } from "axios";
import { ca } from "date-fns/locale";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export function SettingsModal({ isOpen, onClose, user }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<
    "personal" | "professional" | "account" | "privacy"
  >("personal");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateUserInfo, setIsAuthenticated, setUser } =
    useContext<any>(AuthContext);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    address: user.address || "",
    postal_code: user.postal_code || "",
    city: user.city || "",
    country: user.country || "",
    military_id: user.military_id || "",
    regiment: user.regiment || "",
    military_unit: user.military_unit || "",
    rank: user.rank || "",
    professional_email: user.professional_email || "",
    professional_phone_number: user.professional_phone_number || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "account") {
      if (newPassword !== confirmPassword) {
        notifyError("Les mots de passe ne correspondent pas.");
      } else {
        if (newPassword === "") {
          updateUserPassword({ password, new_password: newPassword })
            .then((_: AxiosResponse) => {
              setPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setUser(null);
              setIsAuthenticated(false);
              window.location.reload();
              notifySuccess("Votre mot de passe a été mis à jour avec succès.");
            })
            .catch((error: any) => {
              console.error(error);
              notifyError(
                "Une erreur s'est produite lors de la mise à jour de votre mot de passe."
              );
            });
        } else {
          notifyError("Le nouveau mot de passe ne peut pas être vide.");
        }
      }
    } else {
      updateUser(formData)
        .then((_: AxiosResponse) => {
          updateUserInfo();
          notifySuccess("Vos informations ont été mises à jour avec succès.");
        })
        .catch((error: any) => {
          console.error(error);
          notifyError(
            "Une erreur s'est produite lors de la mise à jour de vos informations."
          );
        });
    }
  };

  const handleDeleteAccount = async () => {
    // Delete account logic
    deleteAccount()
      .then((res: AxiosResponse) => {
        onClose();
        notifySuccess("Votre compte a été supprimé avec succès.");
        localStorage.clear();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors de la suppression de votre compte."
        );
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-[#202123] rounded-lg w-full max-w-5xl relative max-h-[85vh] flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Menu latéral */}
        <div className="w-full lg:w-56 border-b lg:border-b-0 lg:border-r border-[#343541] p-3">
          <div className="flex flex-col items-center mb-3">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#009B70] flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          <nav className="flex flex-row lg:flex-col gap-1">
            <button
              onClick={() => setActiveTab("personal")}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                transition-colors duration-200
                ${
                  activeTab === "personal"
                    ? "bg-[#009B70] text-white"
                    : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                }
              `}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Mes coordonnées</span>
            </button>

            <button
              onClick={() => setActiveTab("professional")}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                transition-colors duration-200
                ${
                  activeTab === "professional"
                    ? "bg-[#009B70] text-white"
                    : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                }
              `}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden lg:inline">Ma carrière</span>
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                transition-colors duration-200
                ${
                  activeTab === "account"
                    ? "bg-[#009B70] text-white"
                    : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                }
              `}
            >
              <Lock className="w-4 h-4" />
              <span className="hidden lg:inline">Compte et sécurité</span>
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`
                flex-1 lg:w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                transition-colors duration-200
                ${
                  activeTab === "privacy"
                    ? "bg-[#009B70] text-white"
                    : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                }
              `}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden lg:inline">Confidentialité</span>
            </button>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Informations personnelles
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            first_name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            last_name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Coordonnées
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Téléphone mobile
                      </label>
                      <input
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone_number: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Adresse
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={formData.postal_code}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              postal_code: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Informations militaires
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Matricule
                      </label>
                      <input
                        type="text"
                        value={formData.military_id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            military_id: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Grade
                      </label>
                      <input
                        type="text"
                        value={formData.rank}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            rank: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Affectation
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Régiment
                      </label>
                      <input
                        type="text"
                        value={formData.regiment}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            regiment: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        value={formData.military_unit}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            military_unit: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Contact professionnel
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email professionnel
                      </label>
                      <input
                        type="email"
                        value={formData.professional_email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            professional_email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Téléphone professionnel
                      </label>
                      <input
                        type="tel"
                        value={formData.professional_phone_number}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            professional_phone_number: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Sécurité
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Mot de passe actuel
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nouveau mot de passe
                      </label>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="w-full px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Suppression du compte
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    La suppression de votre compte est définitive et entraînera
                    la perte de toutes vos données.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                  >
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Confidentialité et mentions légales
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Nous accordons une grande importance à la protection de vos
                    données personnelles. Veuillez consulter nos différentes
                    politiques pour comprendre comment nous traitons vos
                    informations.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#2A2B32] p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Conditions Générales d'Utilisation
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        Nos CGU définissent les règles d'utilisation de la
                        plateforme CDTARGET.
                      </p>
                      <a
                        href="https://www.cdtar.com/cgu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#009B70] hover:text-[#007B56] transition-colors"
                      >
                        Consulter les CGU
                      </a>
                    </div>

                    <div className="bg-[#2A2B32] p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Conditions Générales de Vente
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        Nos CGV encadrent les conditions de vente de nos
                        services.
                      </p>
                      <a
                        href="https://www.cdtar.com/cgv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#009B70] hover:text-[#007B56] transition-colors"
                      >
                        Consulter les CGV
                      </a>
                    </div>

                    <div className="bg-[#2A2B32] p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Politique de confidentialité
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        Notre politique de confidentialité détaille comment nous
                        collectons, utilisons et protégeons vos données.
                      </p>
                      <a
                        href="https://www.cdtar.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#009B70] hover:text-[#007B56] transition-colors"
                      >
                        Consulter la politique de confidentialité
                      </a>
                    </div>

                    <div className="bg-[#2A2B32] p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Mentions légales
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        Les mentions légales contiennent les informations
                        juridiques relatives à notre société.
                      </p>
                      <a
                        href="https://www.cdtar.com/mentions-legales"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#009B70] hover:text-[#007B56] transition-colors"
                      >
                        Consulter les mentions légales
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Boutons fixes en bas */}
            <div className="pt-3 mt-3 border-t border-[#343541] flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-[#009B70] text-white rounded-lg
                         hover:bg-[#007B56] transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Suppression définitive de mon compte"
        message="Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible et entraînera la perte de toutes vos données."
      />
    </div>
  );
}

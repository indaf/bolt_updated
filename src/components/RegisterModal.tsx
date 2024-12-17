import React, { useContext, useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  FileText,
  Medal,
  Building,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { isStrongPassword } from "../utils/security";
import { SuccessModal } from "./SuccessModal";
import { CreateAccountType } from "../services/Auth/types/CreateAccount.type";
import { createAccount, loginUser } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { retrieveUser, setIsAuthenticated } = useContext<any>(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [account, setAccount] = useState<CreateAccountType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "shooter",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const validateName = (name: string): boolean => {
    return /^[a-zA-ZÀ-ÿ\s-]+$/.test(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step < 4) {
      validateStep();
      return;
    }

    if (account.password !== account.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!isStrongPassword(account.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    const resetRegisterForm = () => {
      setStep(1);
      setAccount({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "shooter",
      });
    };

    createAccount(account)
      .then((_: AxiosResponse) => {
        loginUser({ email: account.email, password: account.password })
          .then((loginResp: AxiosResponse) => {
            setShowSuccess(true);
            const { refresh, access } = loginResp.data;
            localStorage.setItem("token", access);
            localStorage.setItem("refresh_token", refresh);
            retrieveUser();
            setIsAuthenticated(true);
            localStorage.setItem("keep_alive", "true");
            navigate("/discover");
            notifySuccess("Compte créé avec succès.");
            onClose();
          })
          .catch((error: any) => {
            notifyError(
              "Une erreur est survenue lors de la connexion à votre compte."
            );
            if (
              account.role === "instructor" &&
              error.response.status === 400
            ) {
              setError(
                "Votre compte a été créé. Il n'est cependant pas activé pour le moment. Veuillez contacter CDTarget afin d'activer le compte."
              );
            } else {
              setError(error.message);
            }
          })
          .finally(() => {
            resetRegisterForm();
          });
      })
      .catch((error: any) => {
        setError(error.message);
        notifyError(
          "Une erreur est survenue lors de la création de votre compte."
        );
      });
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!account.first_name || !account.last_name) {
          setError("Veuillez remplir tous les champs.");
          return;
        }
        if (!validateName(account.first_name)) {
          setError("Le prénom ne doit contenir que des lettres.");
          return;
        }
        if (!validateName(account.last_name)) {
          setError("Le nom ne doit contenir que des lettres.");
          return;
        }
        break;
      case 2:
        if (!account.email || !account.password || !account.confirmPassword) {
          setError("Veuillez remplir tous les champs.");
          return;
        }
        if (account.password !== account.confirmPassword) {
          setError("Les mots de passe ne correspondent pas.");
          return;
        }
        break;
      case 3:
        if (!account.role) {
          setError("Veuillez sélectionner un type de compte.");
          return;
        }
        break;
    }
    setError("");
    setStep(step + 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <div
            className={`w-3 h-3 rounded-full ${
              s === step
                ? "bg-[#009B70]"
                : s < step
                ? "bg-[#009B70]/50"
                : "bg-gray-600"
            }`}
          />
          {s < 4 && (
            <div
              className={`w-12 h-0.5 ${
                s < step ? "bg-[#009B70]/50" : "bg-gray-600"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              Informations personnelles
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={account.first_name}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    placeholder="Entrez votre prénom..."
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Lettres uniquement (ex: Jean-Pierre)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={account.last_name}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    placeholder="Entrez votre nom..."
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Lettres uniquement (ex: Dupont)
                </p>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              Identifiants de connexion
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    placeholder="Entrez votre email..."
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={account.password}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-12 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    placeholder="Entrez votre mot de passe..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={account.confirmPassword}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-12 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    placeholder="Confirmez votre mot de passe..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              Type de compte
            </h3>
            <div className="space-y-4">
              <label className="block p-4 bg-[#2A2B32] rounded-lg cursor-pointer hover:bg-[#343541] transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="shooter"
                    checked={account.role === "shooter"}
                    onChange={(e) =>
                      setAccount((prev) => ({ ...prev, role: "shooter" }))
                    }
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-white">Compte Tireur</div>
                    <p className="text-sm text-gray-400 mt-1">
                      Accédez à vos résultats d'exercices et suivez votre
                      progression. Idéal pour les tireurs qui souhaitent
                      améliorer leurs performances.
                    </p>
                  </div>
                </div>
              </label>

              <label className="block p-4 bg-[#2A2B32] rounded-lg cursor-pointer hover:bg-[#343541] transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    value="instructor"
                    checked={account.role === "instructor"}
                    onChange={(e) =>
                      setAccount((prev) => ({ ...prev, role: "instructor" }))
                    }
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-white">
                      Compte Instructeur
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Créez et gérez des exercices, suivez les performances de
                      vos tireurs. Pour les instructeurs qualifiés et certifiés.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              Informations complémentaires
            </h3>
            <div className="space-y-4">
              {account.role === "instructor" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Code de validation instructeur
                  </label>
                  <div className="relative">
                    <Medal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={account.validationCode}
                      onChange={(e) =>
                        setAccount((prev) => ({
                          ...prev,
                          validationCode: e.target.value,
                        }))
                      }
                      placeholder="Si vous avez déjà un code fourni par CDTARGET, écrivez-le ici..."
                      className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Si vous n'avez pas de code, lors de votre inscription votre
                    compte sera enregistré et en attente d'acceptation par
                    CDTARGET
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Régiment
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={account.regiment}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        regiment: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Matricule
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={account.military_id}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        military_id: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                  />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  if (showSuccess) {
    return (
      <SuccessModal
        isOpen={true}
        onClose={onClose}
        isPendingInstructor={
          account.role === "instructor" && !account.validationCode
        }
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-[#202123] rounded-lg w-[95%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">
          Créer un compte
        </h2>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {renderStep()}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
            )}
            <div className="flex-1" />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              {step < 4 ? (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

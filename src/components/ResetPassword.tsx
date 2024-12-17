import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Lock, CheckCircle2, XCircle } from "lucide-react";
import { isStrongPassword } from "../utils/security";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  checkResetTokenExist,
} from "../services/Auth/Auth.service";
import { AxiosError, AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [error, setError] = useState("");
  const token = new URLSearchParams(window.location.search).get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      checkResetTokenExist(token)
        .then((response: AxiosResponse) => {
          if (response.data.exist !== true) {
            notifyError(
              "Le token de réinitialisation de mot de passe est invalide."
            );
            navigate("/");
          }
        })
        .catch((_: AxiosError) => {
          notifyError(
            "Le token de réinitialisation de mot de passe est invalide."
          );
          navigate("/");
        });
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }
    if (token) {
      changePassword({ token, password })
        .then((_: AxiosResponse) => {
          setStatus("success");
        })
        .catch((error: AxiosError) => {
          console.error(error);
          notifyError(
            "Une erreur est survenue lors de la réinitialisation du mot de passe."
          );
        });
    }
    // const result = resetPassword(token, password);
    // setStatus(result.success ? "success" : "error");
  };

  return (
    <div className="h-full bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="bg-[#202123] rounded-lg p-8 max-w-md w-full">
        {status === "form" && (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">
              Réinitialisation du mot de passe
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#009B70] text-white rounded-lg
                         hover:bg-[#007B56] transition-colors"
              >
                Réinitialiser le mot de passe
              </button>
            </form>
          </>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-[#009B70] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Mot de passe réinitialisé
            </h2>
            <p className="text-gray-400 mb-6">
              Votre mot de passe a été modifié avec succès.
            </p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
            >
              Se connecter
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Erreur</h2>
            <p className="text-gray-400 mb-6">
              Le lien de réinitialisation est invalide ou a expiré.
            </p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
            >
              Retour à l'accueil
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

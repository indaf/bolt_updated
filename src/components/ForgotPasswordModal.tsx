import React, { useState } from "react";
import { X, Mail, ArrowLeft } from "lucide-react";
import { askForResetPassword } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    askForResetPassword(email)
      .then((_: AxiosResponse) => {
        setMessage({
          type: "success",
          text: "Un email a été envoyé à l'adresse indiquée.",
        });
      })
      .catch((error: any) => {
        console.error(error);
        setMessage({
          type: "error",
          text: "Une erreur est survenue lors de l'envoi du mail.",
        });
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour à la connexion</span>
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">
          Mot de passe oublié
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-500/10 border border-green-500/20 text-green-500"
                  : "bg-red-500/10 border border-red-500/20 text-red-500"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                placeholder="Entrez votre adresse email"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Entrez l'adresse email associée à votre compte. Nous vous
              enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                         hover:bg-[#007B56] transition-colors"
            >
              Envoyer le lien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

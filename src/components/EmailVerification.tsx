import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { CheckCircle2, XCircle } from "lucide-react";

interface EmailVerificationProps {
  token: string;
}

export function EmailVerification({ token }: EmailVerificationProps) {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const verifyEmail = useAuthStore((state) => state.verifyEmail);

  useEffect(() => {
    const result = verifyEmail(token);
    setStatus(result.success ? "success" : "error");
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen bg-[#131415] flex items-center justify-center p-4">
      <div className="bg-[#202123] rounded-lg p-8 max-w-md w-full">
        {status === "verifying" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#009B70] border-t-transparent mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Vérification en cours
            </h2>
            <p className="text-gray-400">
              Veuillez patienter pendant que nous vérifions votre email...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-[#009B70] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Email vérifié
            </h2>
            <p className="text-gray-400 mb-6">
              Votre adresse email a été vérifiée avec succès.
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
            <h2 className="text-xl font-semibold text-white mb-2">
              Erreur de vérification
            </h2>
            <p className="text-gray-400 mb-6">
              Le lien de vérification est invalide ou a expiré.
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

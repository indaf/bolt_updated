import React, { useContext, useState } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { loginUser, resendActivationMail } from "../services/Auth/Auth.service";
import { AuthContext } from "../context/Auth.context";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { retrieveUser, setIsAuthenticated } = useContext<any>(AuthContext);
  const [showResendMail, setShowResendMail] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    loginUser({ email: account.email, password: account.password })
      .then((loginResp: AxiosResponse) => {
        const { refresh, access } = loginResp.data;
        localStorage.setItem("token", access);
        localStorage.setItem("refresh_token", refresh);
        retrieveUser();
        setIsAuthenticated(true);
        localStorage.setItem("keep_alive", account.rememberMe.toString());
        navigate("/discover");
        onClose();
      })
      .catch((error: any) => {
        if (error.response.data.error == 101) {
          setShowResendMail(true);
          notifyError(
            "Votre compte n'a pas été activé. Veuillez vérifier votre boîte mail."
          );
          setError(
            "Votre compte n'a pas été activé. Veuillez vérifier votre boîte mail."
          );
        } else {
          notifyError(
            "Une erreur est survenue lors de la connexion à votre compte."
          );
          setError(error.response.data.message);
        }
      });
  };

  const handleResendMail = () => {
    if (!account.email) {
      notifyError("Veuillez entrer votre email pour renvoyer le mail.");
      return;
    }
    resendActivationMail(account.email)
      .then((response: AxiosResponse) => {
        notifySuccess("Le mail d'activation a été renvoyé.");
      })
      .catch((error: any) => {
        notifyError("Une erreur est survenue lors de l'envoi du mail.");
      });
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        isOpen={true}
        onClose={() => setShowForgotPassword(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-[#202123] rounded-lg w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          {showResendMail && (
            <p
              onClick={handleResendMail}
              className="text-sm text-red-500 underline cursor-pointer transition-colors hover:text-red-400"
            >
              Renvoyez le mail
            </p>
          )}

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
                  setAccount((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
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
                  setAccount((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full pl-10 pr-12 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
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

          <div className="flex items-center flex-col justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={account.rememberMe}
                onChange={(e) =>
                  setAccount((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#009B70] bg-[#2A2B32] border-gray-700 rounded
                       focus:ring-[#009B70] focus:ring-offset-gray-800"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-300"
              >
                Se souvenir de moi
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-[#009B70] hover:text-[#007B56] transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                         hover:bg-[#007B56] transition-colors"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

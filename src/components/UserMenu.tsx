import React, { useContext, useState } from "react";
import { ChevronDown, LogOut, Settings, Key, HelpCircle } from "lucide-react";
import { ClaimResultsModal } from "./ClaimResultsModal";
import { SettingsModal } from "./SettingsModal";
import { FAQModal } from "./FAQModal";
import { User } from "../types/user";
import { AuthContext } from "../context/Auth.context";

interface UserMenuProps {
  user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const { setUser, setIsAuthenticated } = useContext<any>(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#343541] rounded-lg
                   hover:bg-[#3E3F4B] transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#009B70] flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>
          )}
          <div className="hidden lg:block text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm block">
                {user?.rank || ""} {user.first_name} {user.last_name}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-[#202123] rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setIsSettingsModalOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300
                     hover:bg-[#2A2B32] transition-colors"
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </button>

          <button
            onClick={() => {
              setIsFAQModalOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300
                     hover:bg-[#2A2B32] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Aide & FAQ
          </button>

          {user.role === "shooter" && (
            <button
              onClick={() => {
                setIsClaimModalOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300
                       hover:bg-[#2A2B32] transition-colors"
            >
              <Key className="w-4 h-4" />
              Récupérer mes résultats
            </button>
          )}

          <button
            onClick={() => {
              handleLogout();
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500
                     hover:bg-[#2A2B32] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      )}

      {user.role === "shooter" && (
        <ClaimResultsModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
        />
      )}

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        user={user}
      />

      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
      />
    </div>
  );
}

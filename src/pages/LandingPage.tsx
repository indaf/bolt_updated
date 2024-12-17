import React, { useContext, useEffect, useState } from "react";
import { Users, FileText, ChevronRight } from "lucide-react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/discover");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#101010] border-b border-[#242424]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/cdtarget-logo.svg"
                alt="CDTARGET Logo"
                className="w-8 h-8 text-[#DC002B]"
              />
              <div>
                <h1 className="text-xl lg:text-2xl text-[#FE0032] font-bebas">
                  CDTARGET
                </h1>
                <p className="text-xs lg:text-sm text-gray-400">
                  Générateur d'exercices
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pc">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-4 py-2 bg-transparent text-[#009B70] border border-[#009B70] rounded-lg 
                         hover:bg-[#009B70] hover:text-white transition-colors"
              >
                S'inscrire
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-[#009B70] text-white rounded-lg 
                         hover:bg-[#007B56] transition-colors flex items-center gap-2"
              >
                Se connecter
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs mobile">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-2 py-1 bg-transparent text-[#009B70] border border-[#009B70] rounded-lg 
                         hover:bg-[#009B70] hover:text-white transition-colors"
              >
                S'inscrire
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-2 py-1 bg-[#009B70] text-white rounded-lg 
                         hover:bg-[#007B56] transition-colors flex items-center gap-1"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bebas mb-8">
              La plateforme dédiée
              <br />à l'instruction du tir.
            </h2>
            <p className="text-xl text-gray-400 mb-16">
              Générez, suivez et analysez les exercices de tir de manière simple
              et efficace
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#202123] p-8 rounded-lg transform transition-transform duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-[#DC002B]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/cdtarget-logo.svg"
                    alt=""
                    className="w-8 h-8 text-[#DC002B]"
                  />
                </div>
                <h3 className="text-xl font-bebas mb-4">
                  Générateur d'exercices
                </h3>
                <p className="text-gray-400">
                  Créez des exercices personnalisés avec des paramètres avancés
                </p>
              </div>

              <div className="bg-[#202123] p-8 rounded-lg transform transition-transform duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-[#009B70]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#009B70]" />
                </div>
                <h3 className="text-xl font-bebas mb-4">Gestion des tireurs</h3>
                <p className="text-gray-400">
                  Suivez les progrès et les résultats de vos tireurs
                </p>
              </div>

              <div className="bg-[#202123] p-8 rounded-lg transform transition-transform duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bebas mb-4">
                  Analyse des résultats
                </h3>
                <p className="text-gray-400">
                  Visualisez et analysez les performances avec des graphiques
                  détaillés
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101010] border-t border-[#242424] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.cdtar.com/cgu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              CGU
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://www.cdtar.com/mentionslegales"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}

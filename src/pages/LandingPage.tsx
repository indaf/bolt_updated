import React, { useContext, useEffect, useState } from "react";
import { Users, FileText, ChevronRight } from "lucide-react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { activateAccount } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import AppIllu from "../assets/exo.png";
import CommuIllu from "../assets/commu.png";
import StatsIllu from "../assets/stats.png";

export function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (queryParams.get("token")) {
      activate(queryParams.get("token") as string);
    }
  }, []);

  const activate = (token: string) => {
    activateAccount(token)
      .then((response: AxiosResponse) => {
        notifySuccess("Votre compte a été activé avec succès.");
      })
      .catch((error: any) => {
        notifyError(
          "Une erreur est survenue lors de l'activation de votre compte."
        );
        console.error(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/discover");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-landing text-white flex flex-col">
      {/* Header */}
      <header className=" border-b border-[#242424]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/cdtarget-logo.png"
                alt="CDTARGET Logo"
                className="w-8 h-8 text-[#DC002B]"
              />
              <div>
                <h1 className="text-xl lg:text-2xl text-[#FE0032] font-bebas">
                  CDTARGET
                </h1>
                {/* <p className="text-xs lg:text-sm text-gray-400">
                  Générateur d'exercices
                </p> */}
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
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          {/* <img
            src="https://images.unsplash.com/photo-1584552539879-41e44a4eb4ed"
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-transparent to-[#0C0C0C]" /> */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-6xl font-bebas mb-8">
              Progressez en tir
              <br />
              grâce à la puissance de nos outils.
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Fournisseurs des armées et formateurs opérationnels, nous
              renforçons la maîtrise de tir de notre communauté.
            </p>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-8 py-4 bg-[#009B70] text-white rounded-lg 
                       hover:bg-[#007B56] transition-colors text-lg font-medium"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
            <div className="w-full md:w-1/2">
              <img
                src={AppIllu}
                alt="Training"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-bebas mb-6">
                Applications d'entraînement interactives
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Améliorez vos compétences avec nos applications spécialisées. Du
                tir de précision à la prise de décision rapide, nos outils vous
                aident à progresser efficacement.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-32">
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-bebas mb-6">
                Suivi de progression détaillé
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Visualisez vos progrès grâce à des statistiques détaillées et
                des graphiques intuitifs. Identifiez vos points forts et vos
                axes d'amélioration.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={StatsIllu}
                alt="Progress tracking"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src={CommuIllu}
                alt="Community"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-bebas mb-6">
                Communauté active d'instructeurs
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Rejoignez une communauté passionnée d'instructeurs et de
                tireurs. Partagez vos expériences et apprenez des meilleurs
                professionnels du domaine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      {/* <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1595590424245-c583fc09cf80"
              alt="Formation professionnelle"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bebas text-center mb-16">
            Ce que disent nos membres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#202123] p-8 rounded-lg">
              <p className="text-gray-300 mb-6">
                "Un outil indispensable pour tout instructeur de tir. La
                génération d'exercices et le suivi des performances sont
                remarquables."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#009B70] flex items-center justify-center">
                  <span className="text-lg font-medium">TM</span>
                </div>
                <div>
                  <p className="font-medium">Thomas Martin</p>
                  <p className="text-sm text-gray-400">Instructeur certifié</p>
                </div>
              </div>
            </div>

            <div className="bg-[#202123] p-8 rounded-lg">
              <p className="text-gray-300 mb-6">
                "Les applications d'entraînement ont considérablement amélioré
                ma précision et mon temps de réaction."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC002B] flex items-center justify-center">
                  <span className="text-lg font-medium">SD</span>
                </div>
                <div>
                  <p className="font-medium">Sophie Dubois</p>
                  <p className="text-sm text-gray-400">Tireuse sportive</p>
                </div>
              </div>
            </div>

            <div className="bg-[#202123] p-8 rounded-lg">
              <p className="text-gray-300 mb-6">
                "La plateforme facilite grandement le suivi de mes élèves. Les
                statistiques sont précises et pertinentes."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-lg font-medium">ML</span>
                </div>
                <div>
                  <p className="font-medium">Marc Laurent</p>
                  <p className="text-sm text-gray-400">
                    Instructeur professionnel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bebas mb-6">
              Prêt à révolutionner votre instruction ?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Rejoignez des milliers d'instructeurs et de tireurs qui font déjà
              confiance à CDTARGET
            </p>
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-12 py-6 bg-[#009B70] text-white rounded-lg 
                         hover:bg-[#007B56] transition-colors text-xl font-medium
                         transform hover:scale-105 duration-200"
              >
                Créer un compte gratuitement
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Déjà membre ? Connectez-vous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#242424] py-8 relative z-10">
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

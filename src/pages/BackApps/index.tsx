import React from "react";
import { Target, Gamepad, Shield, Brain, ChevronRight } from "lucide-react";
import { AppHeader } from "../../components/AppHeader";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

export function BackApps() {
  const navigate = useNavigate();

  const apps = [
    {
      id: "matrix",
      name: "Générateur d'exercice pour la matrice",
      description: "Statistiques et gestion des exercices générés.",
      icon: <Target className="w-8 h-8 text-[#DC002B]" />,
      color: "from-[#DC002B]/20 to-[#DC002B]/5",
      route: "/back-matrix",
    },
    {
      id: "adaptive",
      name: "Adaptive One Training",
      description: "Analyse des performances et des tendances.",
      icon: <Gamepad className="w-8 h-8 text-[#009B70]" />,
      color: "from-[#009B70]/20 to-[#009B70]/5",
      route: "/back-adaptive",
    },
    {
      id: "shootnoshoot",
      name: "Shoot / No Shoot",
      description: "Gestion des images et analyse des résultats.",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      color: "from-blue-500/20 to-blue-500/5",
      route: "/back-shootnoshoot",
    },
    {
      id: "mental",
      name: "Entraînement mental",
      description: "Configuration et suivi des exercices mentaux.",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500/20 to-purple-500/5",
      route: "/back-mental",
    },
  ];

  return (
    <Layout pageTitle="Back Office">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader
            title="Back Apps"
            description="Administration et statistiques des applications"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div
                key={app.id}
                className="relative bg-[#202123] rounded-lg p-6 cursor-pointer
                  transition-transform duration-300 hover:scale-105"
                onClick={() => navigate(app.route)}
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${app.color} 
                            flex items-center justify-center mb-4`}
                >
                  {app.icon}
                </div>

                <h2 className="text-xl font-bebas tracking-wider text-white mb-2">
                  {app.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{app.description}</p>

                <button className="flex items-center gap-2 text-sm text-[#009B70] hover:text-[#007B56] transition-colors">
                  Accéder à l'administration
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

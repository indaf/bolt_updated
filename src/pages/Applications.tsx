import {
  Target,
  Plus,
  Brain,
  ChevronRight,
  Gamepad,
  Shield,
  Clock,
  ListChecksIcon,
  ArrowLeftRight,
} from "lucide-react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { notifyError } from "../helpers/Notify.helper";
import { CiWarning } from "react-icons/ci";

export function Applications() {
  const navigate = useNavigate();
  const { user } = useContext<any>(AuthContext);

  const apps = [
    {
      id: "generate",
      name: "Générateur d'exercice pour la matrice",
      description:
        "Créez des exercices de tir personnalisés avec des paramètres avancés.",
      icon: <Target className="w-8 h-8 text-[#DC002B]" />,
      color: "from-[#DC002B]/20 to-[#DC002B]/5",
      available: true,
      roles: ["admin", "instructor"],
    },
    {
      id: "game",
      name: "Adaptive One Training",
      description:
        "Améliorez votre rapidité et votre précision avec ce jeu interactif.",
      icon: <Gamepad className="w-8 h-8 text-[#009B70]" />,
      color: "from-[#009B70]/20 to-[#009B70]/5",
      available: true,
      roles: [],
    },
    {
      id: "shootnoshoot",
      name: "Shoot / No Shoot",
      description:
        "Entraînez-vous à la reconnaissance rapide des menaces et à la prise de décision.",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      color: "from-blue-500/20 to-blue-500/5",
      available: true,
      roles: [],
    },
    {
      id: "tempo",
      name: "Tempo Shooting",
      description: "Entraînez votre précision temporelle en suivant le rythme.",
      icon: <Clock className="w-6 h-6" />,
      color: "from-purple-500/20 to-purple-500/5",
      available: true,
      roles: [],
    },
    {
      id: "exercise-list",
      name: "Exercices de tir",
      description: "Une liste d'exercices pour vous entraîner.",
      icon: <ListChecksIcon className="w-6 h-6" />,
      color: "from-purple-500/20 to-purple-500/5",
      available: true,
      roles: [],
    },
    {
      id: "target-instructions",
      name: "Générateur de Consignes",
      description:
        "Générez des consignes aléatoires pour l'entraînement au tir sur cibles.",
      icon: <ArrowLeftRight className="w-6 h-6" />,
      color: "from-amber-500/20 to-amber-500/5",
      available: true,
      roles: [],
    },
  ];

  const hasAccess = (app: any) => {
    if (app.roles && app.roles.length > 0) {
      if (user.groups.some((role: any) => app.roles?.includes(role.name))) {
        if (
          app.roles?.includes("admin") &&
          user.groups.some((role: any) => app.roles?.includes("admin"))
        ) {
          return true;
        }
        if (app.roles?.includes("instructor")) {
          if (user.instructor_activated) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <Layout pageTitle="Applications">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bebas tracking-wider text-white mb-8">
            Applications
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {apps.map((app) => (
              <div
                key={app.id}
                className={`
                  relative bg-[#202123] rounded-lg p-6
                  transition-transform duration-300 hover:scale-105 relative
                  ${
                    app.available
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-75"
                  }
                `}
                onClick={() => {
                  if (hasAccess(app)) {
                    app.available && navigate("/" + app.id);
                  }
                }}
                title={
                  !hasAccess(app)
                    ? "Vous n'avez pas les droits pour accéder à ce contenu."
                    : ""
                }
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${app.color} 
                            flex items-center justify-center mb-4`}
                >
                  {app.icon}
                </div>

                <h2 className="text-xl font-medium text-white mb-2">
                  {app.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{app.description}</p>

                {app.available ? (
                  <button className="flex items-center gap-2 text-sm text-[#009B70] hover:text-[#007B56] transition-colors">
                    Ouvrir l'application
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">
                    En développement
                  </span>
                )}
                {!hasAccess(app) && (
                  <div className="absolute bg-black/40 opacity-80 top-0 left-0 right-0 bottom-0 z-30">
                    <CiWarning
                      className="w-8 h-8 text-red-500 right-10 top-10 absolute text-bold"
                      title="Vous n'avez pas les droits pour accéder à ce contenu."
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="bg-[#202123] rounded-lg p-6 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-center">
              <div
                className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-700/20 to-gray-700/5 
                          flex items-center justify-center mb-4"
              >
                <Plus className="w-8 h-8 text-gray-700" />
              </div>
              <h2 className="text-xl font-medium text-gray-700 mb-2">
                Nouvelle application
              </h2>
              <p className="text-gray-500 text-sm">
                D'autres applications seront bientôt disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

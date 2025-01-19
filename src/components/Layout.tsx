import React, { useContext } from "react";
import { SEOHelmet } from "./SEOHelmet";
import { Header } from "./Header";
import { useSidebarStore } from "../store/sidebarStore";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { CiWarning } from "react-icons/ci";
import { ToolsContext } from "../context/Tools.context";

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

const Layout = (props: LayoutProps) => {
  const {
    isOpen,
    toggle,
    toggleMobile,
    isOpenMobile,
    isReduceAlert,
    reduceAlert,
  } = useSidebarStore();
  const location = useLocation();
  const { user } = useContext<any>(AuthContext);
  const { isSettingsModalOpen, setIsSettingsModalOpen } =
    useContext<any>(ToolsContext);
  const isInstructorNotValidated =
    user &&
    user.groups.filter((group: any) => group.name == "instructor").length > 0 &&
    !user.instructor_activated;
  return (
    <div className="h-screen flex flex-col bg-[#131415] text-white overflow-hidden">
      <SEOHelmet
        title={`CDTARGET - ${props.pageTitle}`}
        description="Plateforme professionnelle pour la gestion et le suivi des exercices de tir."
        path={`${location.pathname}`}
      />

      <div className="flex-none pc">
        <Header onMenuClick={toggle} />
      </div>
      <div className="flex-none mobile">
        <Header onMenuClick={toggleMobile} />
      </div>
      {isInstructorNotValidated && (
        <div
          className="bg-red-500/10 text-red-500 flex flex-col justify-center items-center w-full p-2 cursor-pointer"
          onClick={() => reduceAlert(!isReduceAlert)}
        >
          <div className="flex items-center justify-center w-full">
            <CiWarning className="w-6 h-6" />
            <p className="text-sm ml-2">
              Votre compte instructeur n'est pas encore validé. Vous ne pouvez
              pas encore accéder à toutes les fonctionnalités.
            </p>
          </div>
          {!isReduceAlert && (
            <div className="flex flex-col items-center justify-center w-full">
              {user.instructor_doc.length > 0 ? (
                <p className="text-sm ml-2">
                  Vos documents sont en cours de validation. Cette validation
                  prends entre 24 et 48 heures.
                </p>
              ) : (
                <>
                  <p className="text-sm ml-2">
                    Afin de valider votre compte instructeur, veuillez nous
                    envoyer vos documents justificatifs.
                  </p>
                  <p
                    className="underline cursor-pointer text-sm mt-1"
                    onClick={() => setIsSettingsModalOpen(!isSettingsModalOpen)}
                  >
                    Fournir les documents
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex-1 flex overflow-hidden">
        <div
          className={`pc
            flex-none transition-all duration-300
            ${isOpen ? "w-64" : "w-20"}
          `}
        >
          <Sidebar
            isOpen={isOpen}
            onClose={() => toggle()}
            onToggle={toggle}
            isOpenMobile={isOpenMobile}
            onToggleMobile={toggleMobile}
          />
        </div>
        {isOpenMobile && (
          <div
            className={`
            flex-none transition-all duration-300 mobile
            ${isOpenMobile ? "w-100" : "w-0"}
          `}
          >
            <Sidebar
              isOpen={isOpen}
              onClose={() => toggle()}
              onToggle={toggle}
              isOpenMobile={isOpenMobile}
              onToggleMobile={toggleMobile}
            />
          </div>
        )}

        <div className="flex-1 overflow-auto relative">
          <div className="max-w-[1400px] mx-auto">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

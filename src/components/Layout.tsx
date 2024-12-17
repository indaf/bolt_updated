import React from "react";
import { SEOHelmet } from "./SEOHelmet";
import { Header } from "./Header";
import { useSidebarStore } from "../store/sidebarStore";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

const Layout = (props: LayoutProps) => {
  const { isOpen, toggle, toggleMobile, isOpenMobile } = useSidebarStore();
  const location = useLocation();
  return (
    <div className="h-screen flex flex-col bg-[#0C0C0C] text-white overflow-hidden">
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

import React, { useContext } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { GenerateExercise } from "./pages/GenerateExercise";
import { ExerciseTable } from "./pages/ExerciseTable";
import { ShooterManagement } from "./pages/ShooterManagement";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { Discover } from "./pages/Discover";
import Courses from "./pages/Courses";
import { Applications } from "./pages/Applications";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserProfile } from "./pages/UserProfile";
import { GamePage } from "./pages/Game";
import { ShootNoShoot } from "./pages/ShootNoShoot";
import { useNavigateStore } from "./hooks/useNavigate";
import { useSidebarStore } from "./store/sidebarStore";
import { SEOHelmet } from "./components/SEOHelmet";
import { LandingPage } from "./pages/LandingPage";
import { BackAdaptiveOne } from "./pages/BackApps/BackAdaptiveOne";
import { BackApps } from "./pages/BackApps";
import { BackMatrix } from "./pages/BackApps/BackMatrix";
import { BackShootNoShoot } from "./pages/BackApps/BackShootNoShoot";
import { AuthContext } from "./context/Auth.context";
import ChangePassword from "./pages/ChangePassword";
import Routing from "./routes/index.route";

export default function App() {
  const { currentPage, profileId } = useNavigateStore((state) => state);
  const { isOpen, toggle } = useSidebarStore();
  const { user, isAuthenticated } = useContext<any>(AuthContext);

  // if (!isAuthenticated) {
  //   console.log(currentPage);
  //   if (currentPage !== "change-password" || "") {
  //     return <LandingPage />;
  //   }
  // }

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case "dashboard":
  //       return <Dashboard />; -
  //     case "generate":
  //       return <GenerateExercise />; -
  //     case "game":
  //       return <GamePage />; -
  //     case "shootnoshoot":
  //       return <ShootNoShoot />;-
  //     case "table":
  //       return <ExerciseTable />;
  //     case "shooters":
  //       return <ShooterManagement />; -
  //     case "chat":
  //       return <Chat />;
  //     case "courses":
  //       return <Courses />; -
  //     case "admin":
  //       return <AdminDashboard />;
  //     case "profile":
  //       return <UserProfile userId={profileId || user.id} />; -
  //     case "discover":
  //       return <Discover />;
  //     case "apps":
  //       return <Applications />; -
  //     case "back-apps":
  //       return <BackApps />; -
  //     case "back-adaptive":
  //       return <BackAdaptiveOne />;-
  //     case "back-matrix":
  //       return <BackMatrix />; -
  //     case "back-shootnoshoot":
  //       return <BackShootNoShoot />; -
  //     case "change-password":
  //       return <ChangePassword />; -
  //     case "":
  //       return <LandingPage />; -
  //     default:
  //       return <Dashboard />; -
  //   }
  // };

  return (
    // <div className="h-screen flex flex-col bg-[#0C0C0C] text-white overflow-hidden">
    //   <SEOHelmet
    //     title={`CDTARGET - ${
    //       currentPage.charAt(0).toUpperCase() + currentPage.slice(1)
    //     }`}
    //     description="Plateforme professionnelle pour la gestion et le suivi des exercices de tir."
    //     path={`/${currentPage}`}
    //   />

    //   <div className="flex-none">
    //     <Header onMenuClick={toggle} />
    //   </div>

    //   <div className="flex-1 flex overflow-hidden">
    //     <div
    //       className={`
    //       flex-none transition-all duration-300
    //       ${isOpen ? "w-64" : "w-20"}
    //     `}
    //     >
    //       <Sidebar isOpen={isOpen} onClose={() => toggle()} onToggle={toggle} />
    //     </div>

    //     <div className="flex-1 overflow-auto relative">
    //       <div className="max-w-[1400px] mx-auto">{renderPage()}</div>
    //     </div>
    //   </div>
    // </div>
    <Routing />
  );
}

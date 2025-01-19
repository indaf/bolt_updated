import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { Dashboard } from "../pages/Dashboard";
import ChangePassword from "../pages/ChangePassword";
import { Applications } from "../pages/Applications";
import { Discover } from "../pages/Discover";
import { UserProfile } from "../pages/UserProfile";
import Courses from "../pages/Courses";
import { Chat } from "../pages/Chat";
import { GenerateExercise } from "../pages/GenerateExercise";
import { GamePage } from "../pages/Game";
import { ShootNoShoot } from "../pages/ShootNoShoot";
import { ShooterManagement } from "../pages/ShooterManagement";
import { BackApps } from "../pages/BackApps";
import { BackMatrix } from "../pages/BackApps/BackMatrix";
import { BackAdaptiveOne } from "../pages/BackApps/BackAdaptiveOne";
import { BackShootNoShoot } from "../pages/BackApps/BackShootNoShoot";
import { DetailPost } from "../pages/DetailPost";
import { TempoShooting } from "../pages/TempoShooting";
import { BackTempo } from "../pages/BackApps/BackTempo";
import { ReportManagement } from "../pages/ReportManagement";
import { Shop } from "../pages/Shop";
import { ListExercice } from "../pages/ListExercices";
import { TargetInstructions } from "../pages/TargetInstructions";
import { BackAnnuaire } from "../pages/BackApps/BackAnnuaire";
import { BackConsignes } from "../pages/BackApps/BackConsignes";
import Links from "../pages/Links";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/apps" element={<Applications />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/generate" element={<GenerateExercise />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/shootnoshoot" element={<ShootNoShoot />} />
        <Route path="/shooters" element={<ShooterManagement />} />
        <Route path="/moderation" element={<ReportManagement />} />
        <Route path="/back-apps" element={<BackApps />} />
        <Route path="/back-matrix" element={<BackMatrix />} />
        <Route path="/back-adaptive" element={<BackAdaptiveOne />} />
        <Route path="/back-shootnoshoot" element={<BackShootNoShoot />} />
        <Route path="/back-tempo" element={<BackTempo />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/tempo" element={<TempoShooting />} />
        <Route path="/exercise-list" element={<ListExercice />} />
        <Route path="/target-instructions" element={<TargetInstructions />} />
        <Route path="/back-annuaire" element={<BackAnnuaire />} />
        <Route path="back-consignes" element={<BackConsignes />} />
        <Route path="/links" element={<Links />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

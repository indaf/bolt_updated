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
        <Route path="/back-apps" element={<BackApps />} />
        <Route path="/back-matrix" element={<BackMatrix />} />
        <Route path="/back-adaptive" element={<BackAdaptiveOne />} />
        <Route path="/back-shootnoshoot" element={<BackShootNoShoot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

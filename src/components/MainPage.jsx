import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Settings from "./Settings";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const MainPage = () => {
  return (
    <div className="flex animate-fadeIn duration-1000">
      <Sidebar />
      <Routes>
        <Route path="chat" element={<MainContent />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default MainPage;

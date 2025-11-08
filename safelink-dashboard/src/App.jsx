// src/App.jsx

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import Dashboard from "./pages/Dashboard";
import NearbyDevices from "./pages/NearbyDevices";
import RescueLog from "./pages/RescueLog";
import "./App.css";

function AppContent() {
  return (
    <div className="appShell">
      <Sidebar />
      <main className="appMain">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nearby-devices" element={<NearbyDevices />} />
          <Route path="/rescues" element={<RescueLog />} />
          <Route path="/settings" element={
            <div className="pagePlaceholder">
              <h2>Settings</h2>
              <p>Settings page coming soon...</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

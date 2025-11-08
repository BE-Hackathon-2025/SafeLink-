// src/components/layout/TopBar.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import "./TopBar.css";

export default function TopBar() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/nearby-devices":
        return "Nearby Devices";
      case "/rescues":
        return "Rescue Log";
      case "/settings":
        return "Settings";
      default:
        return "Rescue Operations";
    }
  };

  const getSubtitle = () => {
    switch (location.pathname) {
      case "/nearby-devices":
        return "Discover and connect with devices in your mesh network. Send direct messages to any device.";
      case "/rescues":
        return "Complete history of all rescue events and operations.";
      case "/settings":
        return "Configure your SafeLink Mesh AI dashboard.";
      default:
        return "Live overview of ongoing and completed rescues in your network.";
    }
  };

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{getTitle()}</h1>
        <p className="topbar__subtitle">
          {getSubtitle()}
        </p>
      </div>
      <div className="topbar__right">
        <div className="topbar__pill">
          <span className="topbar__statusDot" />
          Live updating
        </div>
        <button className="topbar__btn">Export data</button>
      </div>
    </header>
  );
}

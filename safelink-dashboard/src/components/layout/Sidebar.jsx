// src/components/layout/Sidebar.jsx

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__dot" />
        <span>SafeLink Command</span>
      </div>
      <nav className="sidebar__nav">
        <div className="sidebar__sectionTitle">Overview</div>
        <button
          className={`sidebar__item ${isActive("/") ? "sidebar__item--active" : ""}`}
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>
        <button
          className={`sidebar__item ${isActive("/nearby-devices") ? "sidebar__item--active" : ""}`}
          onClick={() => navigate("/nearby-devices")}
        >
          Nearby Devices
        </button>
        <button
          className={`sidebar__item ${isActive("/rescues") ? "sidebar__item--active" : ""}`}
          onClick={() => navigate("/rescues")}
        >
          Rescue log
        </button>
        
        <div className="sidebar__sectionTitle" style={{ marginTop: "24px" }}>
          Actions
        </div>
        <button
          className="sidebar__item sidebar__item--action"
          onClick={() => {
            // This will be handled by the parent component
            window.dispatchEvent(new CustomEvent("openRequestHelp"));
          }}
        >
          Request Help
        </button>
        <button
          className="sidebar__item sidebar__item--action"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("openStatusUpdate"));
          }}
        >
          Status Update
        </button>
        
        <div className="sidebar__sectionTitle" style={{ marginTop: "24px" }}>
          Settings
        </div>
        <button
          className={`sidebar__item ${isActive("/settings") ? "sidebar__item--active" : ""}`}
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>
      </nav>
      <div className="sidebar__footer">
        <div className="sidebar__badge">
          Mesh online
        </div>
        <small className="sidebar__footnote">
          Powered by SafeLink Mesh AI
        </small>
      </div>
    </aside>
  );
}


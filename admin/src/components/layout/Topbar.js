import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Topbar.css";

const Topbar = ({ collapsed = false }) => {
  const role = localStorage.getItem("role");

  return (
    <header className={`app-topbar ${collapsed ? "app-topbar-collapsed" : ""}`}>
      
      <div className="app-topbar-left">
        
        <div className="app-topbar-brand">
          <div className="app-topbar-logo">I2</div>

          <Link
            to={role === "founder" ? "/founder/dashboard" : "/freelancer/dashboard"}
            className="app-topbar-title"
          >
            Idea2Team
          </Link>
        </div>

      </div>

      <div className="app-topbar-right">

        <button className="app-topbar-btn">
          🔔
          <span className="app-topbar-dot"></span>
        </button>

        <button className="app-topbar-btn">
          💬
        </button>

        <button className="app-topbar-logout">
          Logout
        </button>

      </div>

    </header>
  );
};

export default Topbar;
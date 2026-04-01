import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Topbar.css";

const Topbar = ({ collapsed = false }) => {

  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.replace("/login");
  };

  const dashboardRoute =
    role === "founder"
      ? "/founder/dashboard"
      : role === "freelancer"
      ? "/freelancer/dashboard"
      : "/admin/dashboard";

  return (
    <header className={`topbar ${collapsed ? "collapsed" : ""}`}>

      {/* LEFT */}
      <div className="topbar-left">
        <div className="topbar-brand">

          <div className="topbar-logo">I2</div>

          <Link to={dashboardRoute} className="topbar-title">
            Idea2Team
          </Link>

        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        <button className="topbar-btn">
          🔔
          <span className="topbar-dot"></span>
        </button>

        <button className="topbar-btn">
          💬
        </button>

        <button className="topbar-logout" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </header>
  );
};

export default Topbar;
import React from 'react';
import Dashboard from '../layout/DashboardLayout';
import {Link} from "react-router-dom";

const Topbar = ({ collapsed = false, onToggle }) => {
    const role = localStorage.getItem("role");
    const handleLogout=()=>{
        localStorage.clear();
        window.location.replace("/login");
    }
    return (
        <header className={`topbar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="topbar-left">
                
                 <div className="topbar-header">
                <div className="topbar-logo">I2</div>
               <Link 
  to={role === "founder" ? "/founder/dashboard" : "/freelancer/dashboard"} 
  className="topbar-brand-text"
>
  Idea2Team
</Link>
            </div>
                {/* <div className="topbar-search">
                    <span className="topbar-search-icon">🔍</span>
                    <input type="text" placeholder="Search projects, users, tasks..." />
                </div> */}
            </div>

            <div className="topbar-right">
                <button className="topbar-icon-btn">
                    🔔
                    <span className="topbar-badge"></span>
                </button>
                <button className="topbar-icon-btn">
                    💬
                </button>
               <div className = "logout">
                <button className="topbar-icon-btn" style={{color:"black", borderRadius:"2px", padding:"4px 8px",cursor:"pointer",fontWeight:"600",fontSize:"14px", width:"100%"}}  onClick={handleLogout}>
                    Logout
                </button>
               </div>
            </div>
        </header>
    );
};

export default Topbar;

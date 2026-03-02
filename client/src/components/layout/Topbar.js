import React from 'react';

const Topbar = ({ collapsed = false, onToggle }) => {
    return (
        <header className={`topbar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="topbar-left">
                <button className="topbar-toggle" onClick={onToggle}>
                    ☰
                </button>
                <div className="topbar-search">
                    <span className="topbar-search-icon">🔍</span>
                    <input type="text" placeholder="Search projects, users, tasks..." />
                </div>
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
                <button className="topbar-icon-btn" style={{color:"black", borderRadius:"2px", padding:"4px 8px",cursor:"pointer",fontWeight:"600",fontSize:"14px", width:"100%"}} >
                    Logout
                </button>
               </div>
            </div>
        </header>
    );
};

export default Topbar;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import '../../styles/layout.css';


const DashboardLayout = ({ role = 'admin', children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <div className="dashboard-layout">
            <Sidebar role={role} collapsed={collapsed} onToggle={toggleSidebar} />
            <div className={`dashboard-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
                <Topbar collapsed={collapsed} onToggle={toggleSidebar} />
                <main className="dashboard-content">
                    {children}
                </main>
                <Footer/> 
            </div>
        </div>
       
    );
};

export default DashboardLayout;

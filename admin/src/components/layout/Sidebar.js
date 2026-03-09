import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './sidebar.css';

const sidebarMenus = {
    admin: {
        title: 'Admin',
        sections: [
            {
                label: 'Dashboard',
                items: [
                    { icon: '📊', text: 'Overview', path: '/dashboard' },
                ],
            },
            {
                label: 'Management',
                items: [
                    { icon: '👥', text: 'Manage Users', path: '/users' },
                    { icon: '📁', text: 'Manage Projects', path: '/projects' },
                    { icon: '📋', text: 'Reports', path: '/reports' },
                ],
            },
        ],
    },
};

const Sidebar = ({ role = "admin", collapsed = false, onToggle }) => {

    const location = useLocation();
    const menu = sidebarMenus[role];

    const [user, setUser] = useState({});

    useEffect(() => {

        const adminId = localStorage.getItem("admin_id");

        axios.get(`http://localhost:1337/api/admininfo/${adminId}`)
            .then(res => {
                setUser(res.data.data || {});
            })
            .catch(err => console.log(err));

    }, []);

    const getInitials = (name) => {
        if (!name) return "A";
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    return (

        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

             <button className="sidebar-toggle" onClick={onToggle}>
☰
</button>

<br/>

            <nav className="sidebar-nav">
                {menu.sections.map((section, si) => (
                    <div className="sidebar-section" key={si}>
                        <p className="sidebar-section-label">{section.label}</p>

                        {section.items.map((item, ii) => (
                            <Link
                                key={ii}
                                to={item.path}
                                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="sidebar-item-icon">{item.icon}</span>
                                <span className="sidebar-item-text">{item.text}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">

                    <div className="sidebar-user-avatar">
                        {getInitials(user.name)}
                    </div>

                    <div className="sidebar-user-info">
                        <p className="sidebar-user-name">
                            {user.name || "Admin"}
                        </p>

                        <p className="sidebar-user-role">
                            {user.role || "Administrator"}
                        </p>
                    </div>

                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
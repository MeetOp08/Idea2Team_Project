import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarMenus = {
    founder: {
        title: 'Founder',
        sections: [
            {
                label: 'Main',
                items: [
                    { icon: '📊', text: 'Overview', path: '/founder/dashboard' },
                    { icon: '📝', text: 'Post Project', path: '/founder/post-project' },
                    { icon: '📁', text: 'My Projects', path: '/founder/projects' },
                    { icon: '📨', text: 'Applications', path: '/founder/applications' },
                ],
            },
            {
                label: 'Workspace',
                items: [
                    { icon: '🛠️', text: 'Workspace', path: '/founder/workspace' },
                ],
            },
            {
                label: 'Account',
                items: [
                    { icon: '👤', text: 'Profile', path: '/founder/profile' },
                ],
            },
        ],
    },
    freelancer: {
        title: 'Freelancer',
        sections: [
            {
                label: 'Main',
                items: [
                    { icon: '📊', text: 'Overview', path: '/freelancer/dashboard' },
                    { icon: '🔍', text: 'Browse Projects', path: '/freelancer/browse' },
                    { icon: '📤', text: 'My Applications', path: '/freelancer/applications' },
                ],
            },
            {
                label: 'Workspace',
                items: [
                    { icon: '🛠️', text: 'Workspace', path: '/freelancer/workspace' },
                ],
            },
            {
                label: 'Account',
                items: [
                    { icon: '👤', text: 'Profile', path: '/freelancer/profile' },
                ],
            },
        ],
    },
    admin: {
        title: 'Admin',
        sections: [
            {
                label: 'Dashboard',
                items: [
                    { icon: '📊', text: 'Overview', path: '/admin/dashboard' },
                ],
            },
            {
                label: 'Management',
                items: [
                    { icon: '👥', text: 'Manage Users', path: '/admin/users' },
                    { icon: '📁', text: 'Manage Projects', path: '/admin/projects' },
                    { icon: '📋', text: 'Reports', path: '/admin/reports' },
                ],
            },
        ],
    },
};

const userProfiles = {
    founder: { name: 'Alex Morgan', role: 'Founder', initials: 'AM' },
    freelancer: { name: 'Sarah Chen', role: 'Freelancer', initials: 'SC' },
    admin: { name: 'Admin User', role: 'Administrator', initials: 'AU' },
};

const Sidebar = ({ role = 'founder', collapsed = false, onToggle }) => {
    const location = useLocation();
    const menu = sidebarMenus[role];
    const user = userProfiles[role];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="toggle"></div>
           <button className="sidebar-toggle" onClick={onToggle}>
                    ☰
                </button>

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
                    <div className="sidebar-user-avatar">{user.initials}</div>
                    <div className="sidebar-user-info">
                        <p className="sidebar-user-name">{user.name}</p>
                        <p className="sidebar-user-role">{user.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

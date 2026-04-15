import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskBoard from './TaskBoard';
import ChatBox from './ChatBox';
import TeamMembers from './TeamMembers';
import FileVault from './FileVault';
import '../../styles/workspace.css'; // Add our enhanced CSS

const WorkspaceApp = ({ role }) => {
    const userId = sessionStorage.getItem('user_id');
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [activeTab, setActiveTab] = useState('tasks');

    useEffect(() => {
        if (!userId) return;
        const fetchWorkspaces = async () => {
            try {
                if (role === 'founder') {
                    const projsRes = await axios.get(`http://localhost:1337/api/myProject/${userId}`);
                    const projs = projsRes.data.data || [];
                    let allWorkspaces = [];
                    for (let p of projs) {
                        const wRes = await axios.get(`http://localhost:1337/api/project/workspaces/${p.project_id}`);
                        const ws = wRes.data.data;
                        if (ws.length > 0) {
                            allWorkspaces.push({ ...ws[0], project_title: p.title });
                        }
                    }
                    setWorkspaces(allWorkspaces);
                } else {
                    const res = await axios.get(`http://localhost:1337/api/freelancer/workspaces/${userId}`);
                    setWorkspaces(res.data.data || []);
                }
            } catch (err) {
                console.error("Error fetching workspaces", err);
            }
        };
        fetchWorkspaces();
    }, [userId, role]);

    if (!workspaces.length) {
        return (
            <div className="empty-workspace-state">
                <div className="empty-state-content">
                    <span className="empty-state-icon">✨</span>
                    <h2>No active workspaces</h2>
                    <p>{role === 'founder' ? 'Accept freelancers to automatically construct new collaborative environments.' : 'When you get hired, your collaborative workspaces will automatically appear here.'}</p>
                </div>
            </div>
        );
    }

    if (!selectedWorkspace) {
        return (
            <div className="workspace-selector-container">
                <h2 className="workspace-selector-title">Select a Workspace</h2>
                <div className="workspace-cards-grid">
                    {workspaces.map(w => (
                        <div key={w.workspace_id} className="workspace-glass-card" onClick={() => setSelectedWorkspace(w)}>
                            <div className="workspace-glass-content">
                                <h3>{w.project_title || w.name}</h3>
                                <p className="workspace-desc">{w.name}</p>
                                <span className="workspace-date">Created {new Date(w.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="workspace-glass-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="workspace-orchestrator">
            <aside className="workspace-glass-sidebar">
                <div className="sidebar-header">
                    <h3>{selectedWorkspace.project_title}</h3>
                    <p>{selectedWorkspace.name}</p>
                </div>

                <nav className="sidebar-nav">
                    <button className={`nav-glass-btn ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
                        <span className="nav-icon">📋</span> Task Process
                    </button>
                    <button className={`nav-glass-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
                        <span className="nav-icon">💬</span> Team Chat
                    </button>
                    <button className={`nav-glass-btn ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>
                        <span className="nav-icon">✨</span> Team Members
                    </button>
                    <button className={`nav-glass-btn ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>
                        <span className="nav-icon">📁</span> Project Vault
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="back-btn" onClick={() => setSelectedWorkspace(null)}>
                        ← Back to List
                    </button>
                </div>
            </aside>
            
            <main className="workspace-glass-main">
                <div className="workspace-glass-canvas">
                    {activeTab === 'tasks' && <TaskBoard workspaceId={selectedWorkspace.workspace_id} role={role} userId={userId} />}
                    {activeTab === 'chat' && <ChatBox workspaceId={selectedWorkspace.workspace_id} userId={userId} />}
                    {activeTab === 'members' && <TeamMembers workspaceId={selectedWorkspace.workspace_id} role={role} />}
                    {activeTab === 'vault' && <FileVault workspaceId={selectedWorkspace.workspace_id} userId={userId} />}
                </div>
            </main>
        </div>
    );
};

export default WorkspaceApp;

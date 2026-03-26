import '../../styles/BrowseProjects.css';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SearchBar from '../../components/common/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowseProjects = () => {

    const [projects, setProjects] = useState([]);
    const [appliedProjects, setAppliedProjects] = useState([]);
    const [expanded, setExpanded] = useState({});
    const navigate = useNavigate();

    /* ===============================
       FETCH PROJECTS & APPLICATIONS
    ================================ */

    useEffect(() => {
        // Fetch Projects
        axios.get("http://localhost:1337/api/projects")
            .then(res => {
                setProjects(res.data.data);
            })
            .catch(err => console.log(err));
            
        // Fetch freelancer's applied projects
        const userStr = sessionStorage.getItem("user") || localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            const user_id = user.id || user.user_id;
            if (user_id) {
                axios.get(`http://localhost:1337/api/freelancer/myapplication/${user_id}`)
                    .then(res => {
                        const ids = res.data.data.map(app => app.project_id);
                        setAppliedProjects(ids);
                    })
                    .catch(err => console.error("Error fetching applied projects", err));
            }
        }
    }, []);

    // Toggle description
    const toggleDescription = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    /* ===============================
       APPLY PROJECT
    ================================ */

    const handleApply = (id) => {
        navigate(`/apply-project/${id}`);
    };

    return (
        <DashboardLayout role="freelancer">
            <div className="BrowseProjects-scope">
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h1>🔍 Browse Projects</h1>
                    <p>Discover projects that match your skills and interests.</p>
                </div>
            </div>

            {/* SEARCH BAR */}
            <div className="table-container">
                <SearchBar placeholder="Search projects by title, skill, or company..." style={{ flex: 1 }} />
            </div>

            {/* PROJECT CARDS */}
            <div className="projects-grid">
                {projects.length === 0 ? (
                    <p>No projects available.</p>
                ) : (
                    projects.map((val) => {
                        const isExpanded = expanded[val.project_id];
                        const description = val.description ? (isExpanded ? val.description : val.description.slice(0, 120) + "...") : "";

                        return (
                            <div className="project-card" key={val.project_id}>
                                <h2 className="project-title">
                                    {val.title}
                                </h2>

                                <p className="project-description">
                                    {description}
                                    {val.description && val.description.length > 120 && (
                                        <span
                                            className="show-more"
                                            onClick={() => toggleDescription(val.project_id)}
                                        >
                                            {isExpanded ? " Show Less" : " Show More"}
                                        </span>
                                    )}
                                </p>

                                <p className="project-founder">
                                    <strong>Founder:</strong> {val.founder_name}
                                </p>

                                {/* Skills */}
                                <div className="skills">
                                    {val.required_skills?.split(',').map((skill, index) => (
                                        <span key={index} className="skill-tag">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>

                                <p className="project-budget">
                                    <strong>Budget:</strong> ₹{val.budget_min} - ₹{val.budget_max}
                                </p>

                                <p className="project-duration">
                                    <strong>Duration:</strong> {val.duration_weeks} weeks
                                </p>

                                <p className="project-team">
                                    <strong>Team Required:</strong> {val.team_members_required} freelancers
                                </p>

                                <div className="status-line">
                                    Status: <span className="status active">{val.status || 'Active'}</span>
                                </div>

                                <div className="project-actions">
                                    {appliedProjects.includes(val.project_id) ? (
                                        <button
                                            className="edit-btn"
                                            style={{ width: '100%', background: '#9ca3af', borderColor: '#9ca3af', cursor: 'not-allowed', color: 'white' }}
                                            disabled
                                        >
                                            Already Applied
                                        </button>
                                    ) : (
                                        <button
                                            className="edit-btn"
                                            style={{ width: '100%' }}
                                            onClick={() => handleApply(val.project_id)}
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
                    </div>
        </DashboardLayout>
    );
};

export default BrowseProjects;
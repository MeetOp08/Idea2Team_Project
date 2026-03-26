import '../../styles/MyProjects.css';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SearchBar from '../../components/common/SearchBar';

import axios from "axios";

import { useNavigate } from 'react-router-dom';

const MyProjects = () => {

    const [projects, setProjects] = useState([]);
    const [expanded, setExpanded] = useState({});
    const navigate = useNavigate();

    // Load Projects
    useEffect(() => {

        const userId = sessionStorage.getItem("user_id");

        axios.get(`http://localhost:1337/api/myProject/${userId}`)
            .then(res => setProjects(res.data.data))
            .catch(err => console.log(err));

    }, []);

    // Toggle description
    const toggleDescription = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Edit
    const handleEdit = (id) => {
        navigate(`/founder/edit-project/${id}`);
    };

    // Delete
    const handleDelete = (id) => {

        if (!window.confirm("Delete this project?")) return;

        axios.delete(`http://localhost:1337/api/project/${id}`)
            .then(() => {

                setProjects(prev =>
                    prev.filter(project => project.project_id !== id)
                );

                alert("Project deleted successfully");

            })
            .catch(err => console.log(err));
    };

    return (
        <DashboardLayout role="founder">
            <div className="MyProjects-scope">

            <div className="page-header">
                <div>
                    <h1>My Projects</h1>
                    <p>Manage and track all your posted projects.</p>
                </div>

                <button className="btn btn-primary" onClick={() => navigate('/founder/post-project')}
                >
                    + New Project
                </button>
            </div>

            <div className="table-container">
                <SearchBar placeholder="Search projects..." />
            </div>

            {/* PROJECT CARDS */}

            <div className="projects-grid">

                {projects.map((val) => {

                    const isExpanded = expanded[val.project_id];
                    const description = isExpanded
                        ? val.description
                        : val.description.slice(0, 120) + "...";

                    return (

                        <div className="project-card" key={val.project_id}>

                            <h2 className="project-title">
                                {val.title}
                            </h2>

                            <p className="project-description">

                                {description}

                                <span
                                    className="show-more"
                                    onClick={() => toggleDescription(val.project_id)}
                                >
                                    {isExpanded ? " Show Less" : " Show More"}
                                </span>

                            </p>


                            {/* Skills */}

                            <div className="skills">
                                {val.required_skills.split(",").map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        {skill}
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

                            <p className="status-line">
                               <strong>Status:</strong>  <span className="status active">Active</span>
                            </p>

                            <div className="uploadFile">
                                File: {val.upload_file ? (
                                    <a href={`http://localhost:1337/public/${val.upload_file}`} target="_blank" rel="noopener noreferrer">
                                        {val.upload_file}
                                    </a>
                                ) : (
                                    <span>No file uploaded</span>
                                )}
                            </div>
                          
                            <div className="project-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(val.project_id)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(val.project_id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    );
                })}

            </div>

                    </div>
        </DashboardLayout>
    );
};

export default MyProjects;
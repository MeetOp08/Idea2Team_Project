import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import axios from "axios";
import "../../styles/myproject.css";
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    // ✅ Load Founder Projects
    useEffect(() => {

        const userId = localStorage.getItem("user_id");

        axios.get(`http://localhost:1337/api/myProject/${userId}`)
            .then(res => setProjects(res.data.data))
            .catch(err => console.log(err));

    }, []);

    // ✅ EDIT PROJECT
    const handleEdit = (id) => {
        navigate(`/founder/edit-project/${id}`);
    };

    // ✅ DELETE PROJECT
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

            <div className="page-header">
                <div>
                    <h1>My Projects</h1>
                    <p>Manage and track all your posted projects.</p>
                </div>

                <Button
                    variant="primary"
                    onClick={() => navigate('/founder/post-project')}
                >
                    + New Project
                </Button>
            </div>

            <div className="table-container">
                <SearchBar placeholder="Search projects..." />
            </div>

            <div className="table">
                <table className="project-list">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Skills</th>
                            <th>Budget</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projects.map((val, index) => (

                            <tr key={val.project_id}>
                                <td>{index + 1}</td>
                                <td>{val.title}</td>
                                <td>{val.description}</td>
                                <td>{val.required_skills}</td>
                                <td>{val.budget_min}-{val.budget_max}</td>
                                <td>{val.duration_weeks} Weeks</td>

                                <td>

                                    <button
                                        className="action-btn edit"
                                        onClick={() => handleEdit(val.project_id)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDelete(val.project_id)}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>

        </DashboardLayout>
    );
};

export default MyProjects;
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import axios from 'axios';
import Swal from 'sweetalert2';


const PostProject = () => {

    function handlePublish() {
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const category = document.querySelector("#category").value;
        const project_stage = document.querySelector("#project_stage").value;
        const collaboration_type = document.querySelector("#collaboration_type").value;
        const experience_level = document.querySelector("#experience_level").value;
        const budget_min = document.querySelector("#budget_min").value;
        const budget_max = document.querySelector("#budget_max").value;
        const duration_weeks = document.querySelector("#duration_weeks").value;
        const required_skills = document.querySelector("#required_skills").value;

        console.log(title, description, category, project_stage, collaboration_type, experience_level, budget_min, budget_max, duration_weeks, required_skills);

        if (!title || !description || !category || !project_stage || !collaboration_type || !experience_level || !budget_min || !budget_max || !duration_weeks) {
            return Swal.fire("Error", "Please fill all the fields", "error");
        }

        axios.post("http://localhost:1337/api/post-project", {
            title,
            description,
            category,
            required_skills,
            project_stage,
            collaboration_type,
            experience_level,
            budget_min,
            budget_max,
            duration_weeks
        })
            .then((res) => {
                console.log(res.data);
                Swal.fire("Success", "Project posted successfully!", "success");
            })
            .catch((err) => {
                console.log(err);
                Swal.fire("Error", "An error occurred while posting the project. Please try again.", "error");
            })
    }
    return (
        <DashboardLayout role="founder">
            <div className="page-header">
                <div>
                    <h1>🚀 Post a New Project</h1>
                    <p>Create a detailed listing to attract the right freelancers.</p>
                </div>
            </div>

            <div className="form-page">
                <div className="form-card">

                    {/* ── SECTION: Basic Details ── */}
                    <div className="form-section">
                        <div className="form-section-header">
                            <span className="form-section-icon">📋</span>
                            <div>
                                <h3 className="form-section-title">Basic Details</h3>
                                <p className="form-section-desc">Give your project a name and description.</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Project Title</label>
                            <input id="title" type="text" className="form-input" placeholder="Enter project title" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Project Description</label>
                            <textarea id="description"
                                className="form-input form-textarea"
                                placeholder="Describe your project in detail — what problem does it solve, what features do you need?"
                                style={{ minHeight: '140px' }}>
                            </textarea>
                        </div>
                    </div>

                    {/* ── SECTION: Category & Stage ── */}
                    <div className="form-section">
                        <div className="form-section-header">
                            <span className="form-section-icon">🏷️</span>
                            <div>
                                <h3 className="form-section-title">Category & Stage</h3>
                                <p className="form-section-desc">Help freelancers find your project easily.</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Category</label>
                              <select id="category">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                </select>

                            </div>

                            <div className="form-group">
                                <label className="form-label">Project Stage</label>
                                <select id="project_stage" className="form-input form-select">
                                    <option value="idea">💡 Idea</option>
                                    <option value="prototype">🔧 Prototype</option>
                                    <option value="launch">🚀 Launch</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Collaboration Type</label>
                            <select id="collaboration_type" className="form-input form-select">
                                <option value="paid">💰 Paid</option>
                                <option value="equity">📈 Equity</option>
                                <option value="learning">📚 Learning</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Experience Level</label>
                            <select id="experience_level" className="form-input form-select">
                                <option value="beginner">🌱 Beginner</option>
                                <option value="intermediate">⚡ Intermediate</option>
                                <option value="expert">🏆 Expert</option>
                            </select>
                        </div>
                    </div>

                    {/* ── SECTION: Budget & Duration ── */}
                    <div className="form-section">
                        <div className="form-section-header">
                            <span className="form-section-icon">💰</span>
                            <div>
                                <h3 className="form-section-title">Budget & Duration</h3>
                                <p className="form-section-desc">Set your budget range and timeline.</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Minimum Budget</label>
                                <div className="form-input-wrapper">
                                    <span className="form-input-prefix">₹</span>
                                    <input id="budget_min" type="number" className="form-input form-input-with-prefix" placeholder="10,000" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Maximum Budget</label>
                                <div className="form-input-wrapper">
                                    <span className="form-input-prefix">₹</span>
                                    <input id="budget_max" type="number" className="form-input form-input-with-prefix" placeholder="50,000" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group" style={{ maxWidth: '50%' }}>
                            <label className="form-label">Duration (Weeks)</label>
                            <input id="duration_weeks" type="number" className="form-input" placeholder="e.g. 4" />
                        </div>
                    </div>

                    {/* ── SECTION: Skills ── */}
                    <div className="form-section form-section-last">
                        <div className="form-section-header">
                            <span className="form-section-icon">⚡</span>
                            <div>
                                <h3 className="form-section-title">Required Skills</h3>
                                <p className="form-section-desc">What expertise does your project need?</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Skills</label>
                            <input id="required_skills"
                                type="text"
                                className="form-input"
                                placeholder="React, Node.js, MongoDB, Python..." />
                            <p className="form-helper">💡 Separate each skill with a comma</p>
                        </div>
                    </div>

                    {/* ── ACTION BUTTONS ── */}
                    <div className="form-actions">
                        <Button variant="secondary" onClick={() => handlePublish()}>
                            Save as Draft
                        </Button>

                        <Button variant="primary" onClick={() => handlePublish()}>
                            Publish Project
                        </Button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default PostProject;

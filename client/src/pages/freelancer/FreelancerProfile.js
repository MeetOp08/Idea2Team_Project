import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import axios from "axios";
import Swal from "sweetalert2";
import '../../styles/FreelancerProfile.css';

const FreelancerProfile = () => {
    const user_id = sessionStorage.getItem("user_id");
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({
        title: "",
        location: "",
        bio: "",
        contact_info: "",
        skills: "[]",
        experience: "",
        portfolio: "[]",
        pricing: "",
        availability: "",
        github: "",
        linkedin: ""
    });

    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        if (user_id) {
            axios.get(`http://localhost:1337/api/userinfo/${user_id}`)
                .then(res => setUser(res.data.data))
                .catch(err => console.error(err));

            axios.get(`http://localhost:1337/api/profile/${user_id}`)
                .then(res => {
                    if (res.data && res.data.user_id) {
                        setProfile({
                            ...res.data,
                            skills: res.data.skills || "[]",
                            portfolio: res.data.portfolio || "[]",
                            github: res.data.github || "",
                            linkedin: res.data.linkedin || ""
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        axios.post("http://localhost:1337/api/profile", { ...profile, user_id })
            .then(() => {
                Swal.fire("Success", "Profile updated successfully!", "success");
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to update profile", "error");
            });
    };

    const skillsList = JSON.parse(profile.skills || "[]");
    const addSkill = (e) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            const updatedSkills = [...skillsList, newSkill.trim()];
            setProfile(prev => ({ ...prev, skills: JSON.stringify(updatedSkills) }));
            setNewSkill("");
        }
    };
    const removeSkill = (index) => {
        const updatedSkills = skillsList.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, skills: JSON.stringify(updatedSkills) }));
    };

    return (
        <DashboardLayout role="freelancer">
            <div className="FreelancerProfile-scope">
            <div className="page-header">
                <div>
                    <h1>👩‍💻 My Profile</h1>
                    <p>Showcase your skills and attract the right projects.</p>
                </div>
            </div>

            <div className="fp-profile-page">
                <div className="fp-header-card">
                    <div className="fp-cover"></div>
                    <div className="fp-avatar-section">
                        <div className="fp-avatar-large">
                            {user?.full_name ? user.full_name.substring(0, 2).toUpperCase() : "FP"}
                        </div>
                        <div className="fp-user-info">
                            <h2>{user?.full_name}</h2>
                            <p>{profile.title || "Professional Freelancer"}</p>
                        </div>
                    </div>
                </div>

                <div className="fp-form-card">
                    <div className="fp-form-section">
                        <div className="fp-form-section-header">
                            <span className="fp-form-section-icon">👤</span>
                            <h3 className="fp-form-section-title">Personal & Contact Info</h3>
                        </div>
                        <div className="fp-form-grid">
                            <div className="fp-form-group">
                                <label className="fp-form-label">Full Name</label>
                                <input type="text" className="fp-form-input" value={user?.full_name || ""} readOnly />
                            </div>
                            <div className="fp-form-group">
                                <label className="fp-form-label">Email</label>
                                <input type="email" className="fp-form-input" value={user?.email || ""} readOnly />
                            </div>
                        </div>
                        <div className="fp-form-grid">
                            <div className="fp-form-group">
                                <label className="fp-form-label">Location</label>
                                <input name="location" type="text" className="fp-form-input" value={profile.location} onChange={handleChange} placeholder="e.g. New York, NY" />
                            </div>
                            <div className="fp-form-group">
                                <label className="fp-form-label">Contact/Phone</label>
                                <input name="contact_info" type="text" className="fp-form-input" value={profile.contact_info} onChange={handleChange} placeholder="e.g. +1 234 567 890" />
                            </div>
                        </div>
                        <div className="fp-form-group">
                            <label className="fp-form-label">Professional Title</label>
                            <input name="title" type="text" className="fp-form-input" value={profile.title} onChange={handleChange} placeholder="e.g. Full-Stack Developer" />
                        </div>
                        <div className="fp-form-group">
                            <label className="fp-form-label">Bio</label>
                            <textarea name="bio" className="fp-form-input fp-form-textarea" value={profile.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
                        </div>
                    </div>

                    <div className="fp-form-section">
                        <div className="fp-form-section-header">
                            <span className="fp-form-section-icon">⚡</span>
                            <h3 className="fp-form-section-title">Skills & Expertise</h3>
                        </div>

                        <div className="fp-form-group">
                            <input
                                type="text"
                                className="fp-form-input"
                                placeholder="Add a skill and press Enter..."
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={addSkill}
                            />
                        </div>
                        <div className="fp-skills-container">
                            {skillsList.map((s, i) => (
                                <span key={i} className="fp-skill-tag">
                                    {s} <span className="fp-skill-remove-btn" onClick={() => removeSkill(i)}>✕</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="fp-form-section">
                        <div className="fp-form-section-header">
                            <span className="fp-form-section-icon">💼</span>
                            <h3 className="fp-form-section-title">Experience & Social</h3>
                        </div>
                        <div className="fp-form-grid">
                            <div className="fp-form-group">
                                <label className="fp-form-label">Experience (Years)</label>
                                <input name="experience" type="text" className="fp-form-input" value={profile.experience} onChange={handleChange} placeholder="e.g. 5 years" />
                            </div>
                        </div>
                        <div className="fp-form-grid">
                            <div className="fp-form-group">
                                <label className="fp-form-label">GitHub URL</label>
                                <input name="github" type="text" className="fp-form-input" value={profile.github} onChange={handleChange} placeholder="github.com/username" />
                            </div>
                            <div className="fp-form-group">
                                <label className="fp-form-label">LinkedIn URL</label>
                                <input name="linkedin" type="text" className="fp-form-input" value={profile.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" />
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <button onClick={handleSave}>Save Profile Changes</button>
                    </div>
                </div>
            </div>
                    </div>
        </DashboardLayout>
    );
};

export default FreelancerProfile;
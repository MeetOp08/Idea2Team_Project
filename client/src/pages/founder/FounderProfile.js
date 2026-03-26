import '../../styles/FounderProfile.css';
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';


const FounderProfile = () => {
    return (
        <DashboardLayout role="founder">
            <div className="FounderProfile-scope">
            <div className="page-header">
                <div>
                    <h1>🧑‍💼 My Profile</h1>
                    <p>Manage your personal and company information.</p>
                </div>
                <button className="btn btn-primary">Save Changes</button>
            </div>

            <div className="profile-page">
                <div className="profile-header-card">
                    <div className="profile-cover"></div>
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-large">AM</div>
                        <div className="profile-user-info">
                            <h2>Alex Morgan</h2>
                            <p>Founder & CEO at TechVista Inc.</p>
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="profile-details-list">
                            <span>📍 San Francisco, CA</span>
                            <span>🏢 TechVista Inc.</span>
                            <span>📅 Joined Jan 2026</span>
                            <span>⭐ 4.9 Rating</span>
                        </div>
                    </div>
                </div>

                <div className="form-card">
                    <div className="form-section">
                        <div className="form-section-header">
                            <span className="form-section-icon">👤</span>
                            <div>
                                <h3 className="form-section-title">Personal Information</h3>
                                <p className="form-section-desc">Update your profile details and public information.</p>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-input" placeholder="Alex" defaultValue="Alex" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-input" placeholder="Morgan" defaultValue="Morgan" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input" placeholder="alex@idea2team.com" defaultValue="alex@idea2team.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input type="tel" className="form-input" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input type="text" className="form-input" placeholder="San Francisco, CA" defaultValue="San Francisco, CA" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Bio</label>
                            <textarea className="form-input form-textarea" placeholder="Tell us about yourself..." defaultValue="Serial entrepreneur and tech enthusiast. Building innovative products that solve real-world problems. Passionate about leveraging AI and data to create meaningful impact."></textarea>
                        </div>
                    </div>

                    <div className="form-section form-section-last form-section-spaced">
                        <div className="form-section-header">
                            <span className="form-section-icon">🏢</span>
                            <div>
                                <h3 className="form-section-title">Company Information</h3>
                                <p className="form-section-desc">Details about your startup or company.</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="form-input" placeholder="TechVista Inc." defaultValue="TechVista Inc." />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Website</label>
                            <input type="text" className="form-input" placeholder="https://techvista.io" defaultValue="https://techvista.io" />
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Industry</label>
                                <select className="form-input form-select" defaultValue="Technology">
                                    {['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Marketing', 'Other'].map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Company Size</label>
                                <select className="form-input form-select" defaultValue="11-50">
                                    {['1-10', '11-50', '51-200', '200+'].map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Description</label>
                            <textarea className="form-input form-textarea" defaultValue="TechVista is building AI-powered analytics tools that help businesses make smarter decisions through data-driven insights."></textarea>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
        </DashboardLayout>
    );
};

export default FounderProfile;

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

import '../../styles/home.css';

const features = [
    { icon: '🚀', title: 'Post Projects', desc: 'Founders can post detailed projects with budgets, timelines, and required skills to attract top talent.', bg: '#eef2ff', color: '#4f46e5' },
    { icon: '🎯', title: 'Smart Matching', desc: 'Our AI-powered matching engine connects the right freelancers with the right projects automatically.', bg: '#f0fdf4', color: '#16a34a' },
    { icon: '🛠️', title: 'Workspace Tools', desc: 'Built-in task boards, file sharing, milestones, and team chat to manage your project seamlessly.', bg: '#faf5ff', color: '#7c3aed' },
    { icon: '👥', title: 'Build Dream Teams', desc: 'Browse profiles, review portfolios, and assemble the perfect team for your startup vision.', bg: '#fffbeb', color: '#d97706' },
    { icon: '⭐', title: 'Reviews & Ratings', desc: 'Transparent feedback system helps you make informed decisions when choosing collaborators.', bg: '#fef2f2', color: '#dc2626' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track project progress, team performance, and spending with beautiful analytics dashboards.', bg: '#eff6ff', color: '#2563eb' },
];

const testimonials = [
    { name: 'David Park', role: 'CEO at LaunchPad', text: 'Idea2Team helped us build our MVP in 6 weeks. The quality of freelancers and the workspace tools are incredible. Best platform for startup founders.', initials: 'DP', color: '#4f46e5' },
    { name: 'Maria Santos', role: 'Freelance Developer', text: 'I\'ve found amazing projects and clients on Idea2Team. The smart matching saves me hours of searching, and the workspace makes collaboration effortless.', initials: 'MS', color: '#7c3aed' },
    { name: 'Kevin Liu', role: 'CTO at Nextera', text: 'The platform is beautifully designed and incredibly intuitive. We\'ve hired 8 freelancers through Idea2Team and every experience has been outstanding.', initials: 'KL', color: '#059669' },
];

const Home = () => {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <span className="dot"></span>
                            Open for Early Access
                        </div>
                        <h1>
                            Build Your Dream Team,{' '}
                            <span className="text-gradient">Launch Faster</span>
                        </h1>
                        <p className="hero-subtitle">
                            Idea2Team connects visionary founders with world-class freelancers.
                            Find talent, collaborate in real-time, and bring your startup ideas to life.
                        </p>
                        <div className="hero-actions">
                            <Link to="/register">
                                <button className="home-btn home-btn-primary">Start Building — Free</button>
                            </Link>
                            <Link to="/freelancer/browse">
                                <button className="home-btn home-btn-outline">
                                    Browse Projects
                                </button>
                            </Link>
                        </div>
                     
                    </div>

                    <div className="hero-visual">
                        <div className="hero-illustration">
                            <div className="hero-mock-card">
                                <div className="mock-title"></div>
                                <div className="mock-text"></div>
                                <div className="mock-tags">
                                    <span className="mock-tag">React</span>
                                    <span className="mock-tag">Node.js</span>
                                    <span className="mock-tag">AI/ML</span>
                                </div>
                            </div>
                            <div className="hero-mock-card">
                                <div className="mock-title" style={{ width: '45%' }}></div>
                                <div className="mock-text" style={{ width: '75%' }}></div>
                                <div className="mock-tags">
                                    <span className="mock-tag">Design</span>
                                    <span className="mock-tag">Figma</span>
                                </div>
                            </div>
                            <div className="hero-mock-card">
                                <div className="mock-title" style={{ width: '55%' }}></div>
                                <div className="mock-text" style={{ width: '85%' }}></div>
                                <div className="mock-tags">
                                    <span className="mock-tag">Mobile</span>
                                    <span className="mock-tag">Flutter</span>
                                    <span className="mock-tag">Firebase</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* How It Works */}
            <section className="how-section">
                <div className="section-header">
                    <span className="section-label">How It Works</span>
                    <h2>Launch in 3 Simple Steps</h2>
                    <p>From idea to team in minutes — it's that easy.</p>
                </div>
                <div className="how-steps">
                    <div className="how-step">
                        <div className="how-step-number">1</div>
                        <h3>Post Your Project</h3>
                        <p>Describe your project, set your budget, and list the skills you need. It only takes a few minutes.</p>
                    </div>
                    <div className="how-step">
                        <div className="how-step-number">2</div>
                        <h3>Find Your Team</h3>
                        <p>Browse applications, review portfolios, and let our smart matching suggest the best candidates.</p>
                    </div>
                    <div className="how-step">
                        <div className="how-step-number">3</div>
                        <h3>Collaborate & Launch</h3>
                        <p>Use our integrated workspace with task boards, chat, and milestones to bring your vision to life.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            

            {/* CTA */}
            <section className="cta-section">
                <h2>Ready to Build Something Amazing?</h2>
                <p>Join thousands of founders and freelancers who are building the future together.</p>
                <div className="cta-actions">
                    <Link to="/register">
                        <button className="home-btn home-btn-primary">Get Started — It's Free</button>
                    </Link>
                    <Link to="/login">
                        <button className="home-btn home-btn-outline">
                            Sign In
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;

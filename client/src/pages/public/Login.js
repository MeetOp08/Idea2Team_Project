import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    function handleLogin() {
        const email = document.querySelector("#login_email").value;
        const password = document.querySelector("#login_password").value;

        axios.post("http://localhost:1337/api/login", {
            email,
            password
        }).then((res) => {

            // ✅ SAVE LOGIN DATA
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("user_id", res.data.user.user_id);
            localStorage.setItem("role", res.data.user.role);

            Swal.fire("Success", "Login successful!", "success");

            if (res.data.user.role === "founder") {
                window.location.href = "/founder/dashboard";
            } else {
                window.location.href = "/freelancer/dashboard";
            }
        }).catch((err) => {
            console.error(err);
            if (err.response?.status === 403) {
                Swal.fire({
                    html: `Your account has been blocked. Please contact support.<br><a href="/help" style="color: var(--primary-600); font-weight:bold;">Help & Center</a>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire("Error", err.response?.data?.message || "An error occurred during login. Please try again.", "error");
            }
        });
    }

    return (
        <div className="auth-page">
            <div className="auth-visual">
                <div className="auth-visual-content">
                    <h2>Welcome Back!</h2>
                    <p>Sign in to access your dashboard, manage projects, and connect with your team.</p>
                    <div className="auth-visual-graphic">🚀</div>
                </div>
            </div>

            <div className="auth-form-container">
                <div className="auth-form">
                    <div className="auth-form-header">
                        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--gray-900)', textDecoration: 'none' }}>
                            <span style={{ width: '32px', height: '32px', background: 'var(--gradient-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px' }}>I2</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '18px' }}>Idea2Team</span>
                        </Link>
                        <h1>Sign In</h1>
                        <p>Enter your credentials to access your account</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input id="login_email" type="email" className="form-input" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input id="login_password" type="password" className="form-input" placeholder="Enter your password" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--gray-600)', cursor: 'pointer' }}>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/forgot-password" style={{ fontSize: '14px', color: 'var(--primary-600)', fontWeight: '600' }}>Forgot password?</a>
                    </div>
                    <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={handleLogin}>Sign In</Button>

                    <div className="auth-divider">or</div>

                    <Button variant="secondary" size="lg" style={{ width: '100%', marginBottom: '8px' }}>
                        🔵 Continue with Google
                    </Button>
                    <Button variant="secondary" size="lg" style={{ width: '100%' }}>
                        ⚫ Continue with GitHub
                    </Button>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                    <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>
                        <a href="http://localhost:3001" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Admin Login →</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

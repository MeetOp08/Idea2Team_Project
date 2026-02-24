import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/workspace.css';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminOverview from './pages/admin/AdminOverview';
import ManageUsers from './pages/admin/ManageUsers';
import AdminManageProjects from './pages/admin/AdminManageProjects';
import Reports from './pages/admin/Reports';


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard" element={<AdminOverview />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/projects" element={<AdminManageProjects />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      
    </Router>
    
  );
}

export default App;

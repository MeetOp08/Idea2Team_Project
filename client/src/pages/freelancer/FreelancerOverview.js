import '../../styles/FreelancerOverview.css';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import axios from "axios"
import "../../styles/FreelancerOverview.css"

const FreelancerOverview = () => {
    const [projects,setProjects] = useState({
        appliedProjects:0,
        acceptedProjects:0,
        rejeted:0,
        pending:0,
        activeProjects:0
    })
        const navigate = useNavigate();
    const freelancer_id = sessionStorage.getItem("user_id");
    console.log(freelancer_id)
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/freelancer/dashboard/${freelancer_id}`)
        .then(res=>{
            console.log(res.data)
            setProjects(res.data.data)
        })
        .catch(err=>console.log(err))
    },[freelancer_id])
    
   return (
  <DashboardLayout role="Freelancer">
    
    <div className="freelancer-overview-container">

      {/* HEADER */}
      <div className="overview-header">
        <h2>👋 Welcome back, Freelancer</h2>
        <p>Track your applications and projects</p>
      </div>

      {/* STATS */}
      <div className="dashboard-cards">

        <div className="card blue">
          <div className="icon">📂</div>
          <p className="card-title">Applied Projects</p>
          <span className="card-value">{projects.appliedProjects}</span>
        </div>

        <div className="card green">
          <div className="icon">✅</div>
          <p className="card-title">Accepted</p>
          <span className="card-value">{projects.acceptedProjects}</span>
        </div>

        <div className="card red">
          <div className="icon">❌</div>
          <p className="card-title">Rejected</p>
          <span className="card-value">{projects.rejeted}</span>
        </div>

        <div className="card yellow">
          <div className="icon">⏳</div>
          <p className="card-title">Pending</p>
          <span className="card-value">{projects.pending}</span>
        </div>

        <div className="card purple">
          <div className="icon">🚀</div>
          <p className="card-title">Active Projects</p>
          <span className="card-value">{projects.activeProjects}</span>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>

        <div className="quick-grid">

          <div className="quick-card primary" onClick={() => navigate('/freelancer/browse')}>
            <div className="q-icon">🔍</div>
            <h3>Browse Projects</h3>
            <p>Find new opportunities to apply</p>
          </div>

          <div className="quick-card primary" onClick={() => navigate('/freelancer/applications')}>
            <div className="q-icon">📨</div>
            <h3>My Applications</h3>
            <p>Track your application status</p>
          </div>

        </div>
      </div>

    </div>

  </DashboardLayout>
);
};

export default FreelancerOverview;

import '../../styles/FounderOverview.css';
import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import DashboardLayout from '../../components/layout/DashboardLayout';
import axios from "axios";
import "../../styles/FounderOverview.css"

const FounderOverview = () => {
    
    const [projects,setProjects] = useState({
        totalProjects:0,
        activeProjects:0,
        totalApplications:0,
        acceptedFreelancers:0
    })
    const navigate = useNavigate();

    const founder_id = sessionStorage.getItem("user_id");
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/founder/dashboard/${founder_id}`)
        .then(res=>{
            console.log(res.data)
            setProjects(res.data.data)
        })
        .catch(err=>console.log(err))
    },[founder_id]);
    return (
            
  <DashboardLayout  role="founder">
    <div className="founder-overview-container">

      {/* Header */}
      <div className="overview-header">
        <h2>👋 Welcome back, Meet</h2>
        <p>Here’s what’s happening with your projects</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">

        <div className="card blue">

          <p>Total Projects</p>
          <h2>{projects.totalProjects}</h2>
        </div>

        <div className="card green">
          
          <p>Active Projects</p>
          <h2>{projects.activeProjects}</h2>
        </div>

        <div className="card purple">
         
          <p>Total Applications</p>
          <h2>{projects.totalApplications}</h2>
        </div>

        <div className="card orange">
          
          <p>Hired Freelancers</p>
          <h2>{projects.acceptedFreelancers}</h2>
        </div>

      </div>

      {/* Shortcuts */}
      
        <div className="quick-actions">
  <h3>⚡ Quick Actions</h3>

  <div className="quick-grid">

    <div 
      className="quick-card primary"
      onClick={() => navigate('/founder/post-project')}
    >
      <h3>Post New Project</h3>
      <p>Start hiring freelancers in minutes</p>
    </div>

    <div 
      className="quick-card primary"
      onClick={() => navigate('/founder/projects')}
    >
      <h3>Manage Projects</h3>
      <p>Edit, track and update your projects</p>
    </div>

    <div 
      className="quick-card primary"
      onClick={() => navigate('/founder/applications')}
    >
      <h3>View Applications</h3>
      <p>Accept or reject freelancers</p>
    </div>

  </div>
</div>

    </div>
  </DashboardLayout>
);

};

export default FounderOverview;

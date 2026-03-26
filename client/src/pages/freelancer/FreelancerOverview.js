import '../../styles/FreelancerOverview.css';
import {useState,useEffect} from 'react';
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
        <div className="dashboard-cards">

                        <div className="card">
                            <p className="card-title">Applied Projects</p>
                            <span className="card-value">{projects.appliedProjects}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Accepted Projects</p>
                            <span className="card-value">{projects.acceptedProjects}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Rejeted</p>
                            <span className="card-value">{projects.rejeted}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Pending</p>
                            <span className="card-value">{projects.pending}</span>
                        </div>
                         <div className="card">
                            <p className="card-title">Active Projects</p>
                            <span className="card-value">{projects.activeProjects}</span>
                        </div>

                    </div>

       </DashboardLayout>
    );
};

export default FreelancerOverview;

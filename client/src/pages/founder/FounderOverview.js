import '../../styles/FounderOverview.css';
import {useState,useEffect} from 'react';
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
                <DashboardLayout role="founder">
                    <div className="dashboard-cards">

                        <div className="card">
                            <p className="card-title">Total Projects</p>
                            <span className="card-value">{projects.totalProjects}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Active Projects</p>
                            <span className="card-value">{projects.activeProjects}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Total Applications</p>
                            <span className="card-value">{projects.totalApplications}</span>
                        </div>

                        <div className="card">
                            <p className="card-title">Hired Freelancers</p>
                            <span className="card-value">{projects.acceptedFreelancers}</span>
                        </div>

                    </div>
            </DashboardLayout>

    );
};

export default FounderOverview;

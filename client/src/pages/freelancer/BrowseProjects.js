import React, { useState ,useEffect} from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SearchBar from '../../components/common/SearchBar';
import axios from 'axios';

const BrowseProjects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [projects, setProjects] = useState([]);

 useEffect(()=>{
  axios.get("http://localhost:1337/api/projects")
  .then(res => {
      console.log(res.data)
      setProjects(res.data.data)
  })
  .catch(err => console.log(err))
}, [])
    
  const handleView = () =>{
    
  }
  const handleApply = () =>{

  }


    return (
        <DashboardLayout role="freelancer">
            <div className="page-header">
                <div>
                    <h1>Browse Projects</h1>
                    <p>Discover projects that match your skills and interests.</p>
                </div>
            </div>

            <div className="filter-bar">
                <SearchBar placeholder="Search projects by title, skill, or company..." style={{ flex: 1 }} />
            </div>
            <div className="table">
                <table className="project-list">
                    <thead>
                        <tr>
                            <td>#</td>
                            <th>Project Title</th>
                            <th>description</th>
                            <th>founder Name</th>
                            <th>Require_skills</th>
                            <th>budget</th>
                            <th>duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                  <tbody>
                        {Array.isArray(projects) && projects.map((val,index)=>(
                        <tr key={val.project_id}>
                            <td>{index + 1}</td>
                            <td>{val.title}</td>
                            <td>{val.description}</td>
                            <td>{val.founder_name}</td>
                            <td>{val.required_skills}</td>
                            <td>{val.budget_min}-{val.budget_max}</td>
                            <td>{val.duration_weeks} Weeks</td>
                            <td>
                                <button className="action-btn view" onClick={handleView}>View</button>
                                <button className="action-btn apply" onClick={handleApply}>Apply</button>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                </table>
            </div>
           
        </DashboardLayout>
    );
};

export default BrowseProjects;

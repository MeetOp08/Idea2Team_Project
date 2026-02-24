import DashboardLayout from '../../components/layout/DashboardLayout';
import { useState,useEffect } from 'react';
import axios from 'axios';
import '../../styles/ManageUsers.css';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';


const ManageUsers = () => {
    const [users, setUsers] = useState([]);

   useEffect(()=>{
    axios.get("http://localhost:1337/api/Manage-Users")
    .then(response => { 
        setUsers(response.data.data);
    })
    .catch(error => {
        console.error(error);
    })
})


 const handleView = (id) => {
  const user = users.find(user => user.user_id === id);
  if (user) {
    alert("Users Details: \nUser id: " + id + "\nFull Name: " + user.full_name + "\nRole: " + user.role + "\nEmail: " + user.email + "\nPassword: " + user.password + "\nPhone: " + user.phone);
  }
  console.log("Users Details:","\nUser id:", id,
                                 "\nFull Name:", user.full_name, 
                                 "\nRole:", user.role, 
                                 "\nEmail:", user.email, 
                                 "\nPassword:", user.password,
                                 "\nPhone:", user.phone);
};

const handleWarning = (id) => {
    const warningMessage = prompt("Enter warning message:");
    if (warningMessage) {
        alert(`Warning sent to user with id: ${id}\nMessage: ${warningMessage}`);
    }
    console.log(`Warning sent to user with id: ${id}\nMessage: ${warningMessage}`);

}

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete?")) {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.user_id !== id));
      })
      .catch(err => console.log(err));
  }
};
    return (
        <DashboardLayout role="admin">
            <div className="page-header">
                <div>
                    <h1>Manage Users</h1>
                    <p>View and manage all registered users on the platform.</p>
                </div>
                <Button variant="primary">+ Add User</Button>
            </div>

            <div className="filter-bar">
                <SearchBar placeholder="Search by name or email..." />
                <div className="filter-chips">
                    {['All', 'Founder', 'Freelancer'].map(f => (
                        <button key={f} className="filter-chip active">{f}</button>
                    ))}
                </div>
            </div>


            <div className="table">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Phone No</th>
                            <th>Actions</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((val,index)=>(
                            <tr key={val.user_id}>
                                <td>{index+1}</td>
                                <td>{val.full_name}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>{val.role}</td>
                                <td>{val.phone}</td>
                                <td>
                                    <button className="action-btn view" onClick={()=>{handleView(val.user_id)}}>View</button>
                                    <button className="action-btn warn" onClick={()=>{handleWarning(val.user_id)}}>Warning</button>
                                    <button className="action-btn delete" onClick={()=>{handleDelete(val.user_id)}}>Delete</button>
                                </td>
                            </tr>
                       ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default ManageUsers;

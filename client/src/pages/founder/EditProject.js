import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/EditProject.css'

const EditProject = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        required_skills: "",
        budget_min: "",
        budget_max: "",
        duration_weeks: ""
    });

    // ✅ Load Project
    useEffect(() => {

        axios.get(`http://localhost:1337/api/editproject/${id}`)
            .then(res => {
                setForm(res.data.data);
            })
            .catch(err => console.log(err));

    }, [id]);

    // ✅ Handle Input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ✅ Update Project
    const handleUpdate = () => {

        axios.put(
            `http://localhost:1337/api/founder/edit-project/${id}`,
            form
        )
        .then(() => {
            Swal.fire(
                "Updated",
                "Project updated successfully",
                "success"
            ).then(() => {
                navigate("/founder/projects");
            });
        })
        .catch(() => {
            Swal.fire("Error", "Update failed", "error");
        });
    };

 return (
<DashboardLayout role="founder">

<div className="edit-project-container">

<h2>Edit Project</h2>

<div className="edit-project-form">

<label>Project Title</label>
<input
    name="title"
    value={form.title}
    onChange={handleChange}
/>

<label>Description</label>
<textarea
    name="description"
    value={form.description}
    onChange={handleChange}
/>

<label>Required Skills</label>
<input
    name="required_skills"
    value={form.required_skills}
    onChange={handleChange}
/>

<label>Minimum Budget</label>
<input
    name="budget_min"
    value={form.budget_min}
    onChange={handleChange}
/>

<label>Maximum Budget</label>
<input
    name="budget_max"
    value={form.budget_max}
    onChange={handleChange}
/>

<label>Duration (Weeks)</label>
<input
    name="duration_weeks"
    value={form.duration_weeks}
    onChange={handleChange}
/>

<button className="update-btn" onClick={handleUpdate}>
    Update Project
</button>

</div>
</div>

</DashboardLayout>
);
};

export default EditProject;
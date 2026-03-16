import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/application.css";

const Applications = () => {
    const founder_id = localStorage.getItem("user_id");
    console.log("founder_id:",founder_id);
    
    const[application,setApplication]=useState([]);
useEffect(()=>{
    axios.get(`http://localhost:1337/api/info-application/${founder_id}`)
      .then(res=>{
        console.log(res.data)
        setApplication(res.data.data)})
    .catch(err=>console.log(err))
},[])

    return (
      <DashboardLayout role="founder">

      </DashboardLayout>
    );
};

export default Applications;
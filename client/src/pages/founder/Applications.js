import react from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';

const Applications = () => {
    const [application,SetApplication]= useState([]);

    useEffect(()=>{
        axios.get('https://localhost:1337/api/applications')
        .then(res => SetApplication(res.data.data))
        .catch(err => console.log(err));
    }, []);

    return(<>

    </>);
}
export default Applications;
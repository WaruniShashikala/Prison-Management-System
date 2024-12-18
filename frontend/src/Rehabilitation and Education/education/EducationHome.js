import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RehabilitationSidebar from '../RehabilitationSidebar';
import Digital from '../../img/digital.jpg';
import Adult from '../../img/educ.jpg';
import Youth from '../../img/youth.jpg';
import { Link } from 'react-router-dom';
import '../css/EducationHome.css'; 

const EducationHome = () => {

    const [educations, setEducations] = useState([]);

    // Function to fetch all education records from the API
    const fetchEducations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/education'); // Adjust the API endpoint as per your backend route
            console.log(response.data);
            setEducations(response.data);
        } catch (error) {
            console.error('Error fetching education records:', error);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    return (
        <div className='education-home-container'>
            <div className='flex-container'>
                <RehabilitationSidebar />
                <div className='main-content'>
                    <div className='header'>
                        <h1 className='page-title'>Education Categories</h1>
                    </div>
                    <div className="education-cards-container">
                        <Link to="/youthEducation" className="education-card">
                            <div className="card-inner">
                                <img src={Youth} alt="Youth Empowerment Program" className="card-image" />
                                <h2 className="card-title">Youth Empowerment Program</h2>
                            </div>
                        </Link>
                        <Link to="/adultEducation" className="education-card">
                            <div className="card-inner">
                                <img src={Adult} alt="Adult Basic Education Program" className="card-image" />
                                <h2 className="card-title">Adult Basic Education Program</h2>
                            </div>
                        </Link>
                        <Link to="/digitalEducation" className="education-card">
                            <div className="card-inner">
                                <img src={Digital} alt="Digital Literacy Program" className="card-image" />
                                <h2 className="card-title">Digital Literacy Program</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationHome;

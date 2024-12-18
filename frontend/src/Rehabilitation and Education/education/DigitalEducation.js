import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';



const DigitalEducation = () => {
    const [educations, setEducations] = useState([]); // State to store education records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Function to fetch all education records from the API
    const fetchEducations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/education'); // Adjust the API endpoint as per your backend route
            setEducations(response.data);
        } catch (error) {
            console.error('Error fetching education records:', error);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    // Function to filter education records based on search query and category
    const filteredEducations = educations.filter(education =>
        education.programName.toLowerCase().includes(searchQuery.toLowerCase()) && education.category === 'Digital Literacy'
    );

    return (
        <div className='r-container '>
                <RehabilitationSidebar />
                <div>
                    <div className='r-main-content'>
                        <h1 className='r-page-title'>Digital Education</h1>
                        <div className='r-flex-container'>
                            <div className='r-search-container'>
                                <input
                                    className='r-input-field'
                                    type="text"
                                    placeholder='Search Educations'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                               
                            </div>
                        </div>
                        <div className="r-table-container">
                            <table className="r-custom-table">
                                <thead>
                                    <tr className="">
                                        <th >Program Name</th>
                                        <th >Category</th>
                                        <th >Date</th>
                                        <th >Time</th>
                                        <th >Location</th>
                                        <th >Age Group</th>
                                        <th >Instructors</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredEducations.map(education => (
                                        <tr key={education._id} className="">
                                            <td>{education.programName}</td>
                                            <td>{education.category}</td>
                                            <td>{new Date(education.date).toLocaleDateString()}</td>
                                            <td>{education.time}</td>
                                            <td>{education.location}</td>
                                            <td>{education.ageGroup}</td>
                                            <td>{education.instructors}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default DigitalEducation;

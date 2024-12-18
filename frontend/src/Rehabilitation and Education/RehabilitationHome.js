import React from 'react';
import { MdEmojiEvents } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { FaPeoplePulling } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './css/RehabilitationHome.css'; // Importing external CSS file

const RehabilitationHome = () => {
    return (
        <div className='rehabilitation-container'>
            <div className='rehabilitation-grid'>
                <Link to="/allEvents" className="rehabilitation-link">
                    <div className='rehabilitation-card'>
                        <MdEmojiEvents size={50} />
                        <p className='rehabilitation-text'>Events</p>
                    </div>
                </Link>
                <Link to="/allEducation" className="rehabilitation-link">
                    <div className='rehabilitation-card'>
                        <GiGraduateCap size={50} />
                        <p className='rehabilitation-text'>Education</p>
                    </div>
                </Link>
                <Link to="/allTrainings" className="rehabilitation-link">
                    <div className='rehabilitation-card'>
                        <GiTeacher size={50} />
                        <p className='rehabilitation-text'>Vocational Training</p>
                    </div>
                </Link>
                <Link to="/allReintegrations" className="rehabilitation-link">
                    <div className='rehabilitation-card'>
                        <FaPeoplePulling size={50} />
                        <p className='rehabilitation-text'>Reintegrations</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RehabilitationHome;

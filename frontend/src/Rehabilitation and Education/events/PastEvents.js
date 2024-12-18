import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import '../css/UpcomingEvents.css'; 
import Image from '../../img/Pastevents.jpg';

const PastEvents = () => {
    const [events, setEvents] = useState([]); // State to store event records

    // Function to fetch all event records from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/event');
            console.log(response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event records:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to filter past events
    const filterPastEvents = () => {
        const currentDate = new Date();
        const pastEvents = events.filter(event => new Date(event.date) < currentDate);
        return pastEvents;
    };

    // Sort past events by date
    const sortedPastEvents = filterPastEvents().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className='full-width full-height'>
            <div className='flex-container'>
                <RehabilitationSidebar />
                <div className='flex-grow'>
                    <div className='full-width'>
                        <h1 className='page-title'>Past Events</h1>
                        <div className="event-container">
                            {sortedPastEvents.length > 0 ? (
                                sortedPastEvents.map((event, i) => (
                                    <div key={i} className="event-item">
                                        <img src={Image} alt="past events" />
                                        <h2 className="event-title">{event.eventName}</h2>
                                        <p className="event-info">Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className="event-info">Time: {event.time}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-event">No past events</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastEvents;

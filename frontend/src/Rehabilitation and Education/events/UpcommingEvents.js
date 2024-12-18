import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import '../css/UpcomingEvents.css'; // External CSS file
import Image from '../../img/upcomming.jpg';

const UpcomingEvents = () => {
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

    // Function to filter today's events
    const filterTodayEvents = () => {
        const currentDate = new Date();
        const todayEvents = events.filter(event => new Date(event.date).toDateString() === currentDate.toDateString());
        return todayEvents;
    };

    // Function to filter upcoming events
    const filterUpcomingEvents = () => {
        const currentDate = new Date();
        const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
        return upcomingEvents;
    };

    // Combine today's events and upcoming events, sort them by date
    const sortedEvents = [...filterTodayEvents(), ...filterUpcomingEvents()].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='full-width full-height'>
            <div className='flex-container'>
                <RehabilitationSidebar />
                <div className='flex-grow'>
                    <div className='full-width'>
                        <h1 className='page-title'>Upcoming Events</h1>
                        <div className="event-container">
                            {sortedEvents.length > 0 ? (
                                sortedEvents.map((event, i) => (
                                    <div key={i} className="event-item">
                                        <img src={Image} alt="image" />
                                        <h2 className="event-title">{event.eventName}</h2>
                                        <p className="event-info">Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className="event-info">Time: {event.time}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-event">No upcoming events</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;

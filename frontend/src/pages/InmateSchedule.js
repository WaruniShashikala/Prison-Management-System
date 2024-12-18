import React from 'react';
import Content from "../components/Content";
import SideNavbar from "../components/SideNavbar";
import './InmateSchedule.css';

const InmateSchedule = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Define the schedule data with specific time slots for each day
  const schedule = [
    { time: '8:00 AM', Monday: 'Breakfast', Tuesday: 'Breakfast', Wednesday: 'Breakfast', Thursday: 'Breakfast', Friday: 'Breakfast', Saturday: 'Breakfast', Sunday: 'Breakfast' },
    { time: '9:00 AM', Monday: 'Morning Meeting', Tuesday: 'Exercise', Wednesday: 'Education Program', Thursday: 'Recreation', Friday: 'Study Time', Saturday: 'Sports', Sunday: 'Religious Service' },
    { time: '10:00 AM', Monday: 'Skill Development', Tuesday: 'Workshop', Wednesday: 'Reading Time', Thursday: 'Recreation', Friday: 'Creative Writing', Saturday: 'Free Time', Sunday: 'Community Service' },
    { time: '11:00 AM', Monday: 'Group Discussion', Tuesday: 'Music Class', Wednesday: 'Education Program', Thursday: 'Recreation', Friday: 'Art Session', Saturday: 'Community Activity', Sunday: 'Religious Service' },
    { time: '12:00 PM', Monday: 'Lunch', Tuesday: 'Lunch', Wednesday: 'Lunch', Thursday: 'Lunch', Friday: 'Lunch', Saturday: 'Lunch', Sunday: 'Lunch' },
    { time: '1:00 PM', Monday: 'Rest', Tuesday: 'Exercise', Wednesday: 'Education Program', Thursday: 'Skill Development', Friday: 'Art Session', Saturday: 'Sports', Sunday: 'Religious Service' },
    { time: '2:00 PM', Monday: 'Workshop', Tuesday: 'Music Class', Wednesday: 'Reading Time', Thursday: 'Recreation', Friday: 'Group Discussion', Saturday: 'Community Activity', Sunday: 'Rest' },
    { time: '3:00 PM', Monday: 'Recreation', Tuesday: 'Group Therapy', Wednesday: 'Skill Development', Thursday: 'Recreation', Friday: 'Creative Writing', Saturday: 'Community Service', Sunday: 'Rest' },
    { time: '4:00 PM', Monday: 'Sports', Tuesday: 'Exercise', Wednesday: 'Workshop', Thursday: 'Recreation', Friday: 'Counseling', Saturday: 'Free Time', Sunday: 'Religious Service' },
    { time: '4:30 PM', Monday: 'Cleaning Time', Tuesday: 'Cleaning Time', Wednesday: 'Cleaning Time', Thursday: 'Cleaning Time', Friday: 'Cleaning Time', Saturday: 'Cleaning Time', Sunday: 'Cleaning Time' },
  ];

  return (
    <div>
        <SideNavbar />
        <Content />
        <div className="schedule-container">

        <h2 className="sceduleTitle">- INMATE DAILY SCHEDULE -</h2>
        <table className="schedule-table">
            <thead>
            <tr>
                <th>Time</th>
                {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {schedule.map((slot) => (
                <tr key={slot.time}>
                <td className="blue-cell">{slot.time}</td>
                {daysOfWeek.map((day) => (
                    <td key={day} className={slot[day] === 'Breakfast' || slot[day] === 'Lunch' || slot[day] === 'Cleaning Time' ? 'yellow-cell' : ''}>
                    {slot[day]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default InmateSchedule;

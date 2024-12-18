import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import './task.css'; 
import Nav from "../Nav/Nav";
import { useReactToPrint } from "react-to-print";

const Task = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3500/tasks');
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Define deleteHandler function
    const deleteHandler = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3500/tasks/${taskId}`);

            // After deleting, fetch tasks again to update the list
            const response = await axios.get('http://localhost:3500/tasks');
            setTasks(response.data.tasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Work Orders Report",
    onAfterPrint: () => alert("Work Orders Report Successfully Download!"),
  });


    return (
        <div>
          <Nav/>  
          <button className="btn download-btn" onClick={handlePrint}>Download Report</button>
        <div className="task-container">
    
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
            />
            <h1>Work Orders display page</h1>
            <h2>Tasks</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.dueDate}</td>
                            <td>
                                <Link to={`/tasks/${task._id}`}>
                                    <button className="btn update-btn">Update</button>
                                </Link>
                                <button className="btn delete-btn" onClick={() => deleteHandler(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/addTask">
                
                <button className="btn green add-btn">Add</button>
            </Link>
        </div>
        </div>
    );
};

export default Task;

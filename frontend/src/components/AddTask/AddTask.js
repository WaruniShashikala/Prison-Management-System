import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addtask.css"; 
import Nav from '../Nav/Nav';

function AddTask() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        description: "",
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Regular expression to allow only letters and white spaces for text inputs
        const onlyLettersRegex = /^[A-Za-z\s]+$/;
    
        // Update state for text inputs if value matches regex or is empty, otherwise directly for date input
        if ((onlyLettersRegex.test(value) || value === "") || name === "dueDate") {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
        sendRequest().then(() => history("/tasks"));
    };

    const sendRequest = async () => {
        await axios
            .post("http://localhost:5000/tasks", {
                description: String(inputs.description),
                status: String(inputs.status),
                priority: String(inputs.priority),
                assignedTo: String(inputs.assignedTo),
                dueDate: new Date(inputs.dueDate).toISOString(),
            }).then((res) => res.data);
    };

    return (
        <div>
            <Nav/>
            <div className="add-task-container">
                <h1>Add Task Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="description"
                            value={inputs.description}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Status:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="status"
                            value={inputs.status}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Priority:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="priority"
                            value={inputs.priority}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Assigned To:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="assignedTo"
                            value={inputs.assignedTo}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Due Date:</label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="dueDate"
                            value={inputs.dueDate}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './updatetask.css'; 

function UpdateTask() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/tasks/${id}`);
        setInputs(response.data.task); 
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3500/tasks/${id}`, {
        description: String(inputs.description),
        status: String(inputs.status),
        priority: String(inputs.priority),
        assignedTo: String(inputs.assignedTo),
        dueDate: String(inputs.dueDate),
      })
      .then((res) => res.data);
  };

  const handleChanger = (e) => {
    const { name, value } = e.target;

    // Regular expression to allow only letters and white spaces
    const onlyLettersRegex = /^[A-Za-z\s]+$/;

    // Check if the value matches the regular expression or if it's an empty string
    if (onlyLettersRegex.test(value) || value === "") {
        // Update the state only if the value is valid
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
};

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    // Update the state with the selected date
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/tasks'));
  };

  return (
    <div className="update-task-container">
      <h1 className="update-task-title">Update Task</h1>
      <form className="update-task-form" onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleChanger}
          value={inputs.description}
          required
        />

        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          onChange={handleChanger}
          value={inputs.status}
          required
        />

        <label htmlFor="priority">Priority</label>
        <input
          type="text"
          name="priority"
          onChange={handleChanger}
          value={inputs.priority}
          required
        />

        <label htmlFor="assignedTo">Assigned To</label>
        <input
          type="text"
          name="assignedTo"
          onChange={handleChanger}
          value={inputs.assignedTo}
          required
        />

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          onChange={handleDateChange}
          value={inputs.dueDate} // Ensure the value of the input field is bound to the state
          required
        />
        

        <button className="update-task-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateTask;

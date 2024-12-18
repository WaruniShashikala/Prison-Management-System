import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './tasks.css';
import { Modal } from 'antd'; // Import Modal from Ant Design
import TaskReport from './TaskReport'; // Import the TaskReport component
import Nav from '../Nav/Nav';

const URL = "http://localhost:3500/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(URL);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteHandler = async (taskId) => {
    try {
      await axios.delete(`${URL}/${taskId}`);
      const response = await axios.get(URL);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const showReportModal = (task) => {
    setSelectedTask(task);
    setIsVisibleReportModal(true);
  };

  const handleSearch = () => {
    // Implement search logic here
  };

  return (
    <div>
      <Nav/>
    <div className="tasks-container">
      <div className="tasks-content">
        <div className="tasks-header">
          <h1>Work Orders Display Page</h1>
        </div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name='search'
          placeholder="Search Task Details"
          className="search-input"
        />
        <button onClick={handleSearch} className='Task-search'>Search</button>
        {noResults ? (
          <div>
            <p>No Tasks Found</p>
          </div>
        ) : (
          <div className="report">
            <Link to="/addTask">
              <button className="btn green add-btn">Add</button>
            </Link>
            <h2 className="report-title">Work Orders Report</h2>
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
                      <button className="btn print-btn" onClick={() => showReportModal(task)}>Print</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        )}
      </div>
      <Modal
        title="Task Report"
        visible={isVisibleReportModal}
        onCancel={() => setIsVisibleReportModal(false)}
        footer={null}
        width={900}
      >
        {selectedTask && <TaskReport task={selectedTask} />}
      </Modal>
    </div>
    </div>
  );
};

export default Tasks;

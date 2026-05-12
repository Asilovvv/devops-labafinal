import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./style.css";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Loading...");

  const loadTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/data`);
      setTasks(response.data);
      setStatus("Connected to Backend API and PostgreSQL");
    } catch (error) {
      setStatus("Connection error. Check Docker, Nginx, and Backend logs.");
    }
  };

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    await axios.post(`${API_URL}/data`, { title });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/data/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <p className="badge">DigitalOcean Manual Deployment</p>
        <h1>Full-Stack Docker Lab</h1>
        <p className="description">
          Frontend + Backend API + PostgreSQL + Nginx reverse proxy running on one Droplet.
        </p>

        <div className="status">{status}</div>

        <form onSubmit={addTask} className="form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
          />
          <button type="submit">Add</button>
        </form>

        <div className="list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one to test PostgreSQL volume.</p>
          ) : (
            tasks.map((task) => (
              <div className="task" key={task.id}>
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))
          )}
        </div>

        <div className="architecture">
          <p><b>Route /</b> → Frontend container on port 3000</p>
          <p><b>Route /api</b> → Backend container on port 5000</p>
          <p><b>Database</b> → PostgreSQL container on port 5432</p>
          <p><b>Public access</b> → Nginx container on port 80</p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

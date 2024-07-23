import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const token = localStorage.getItem("token");
  
  const [filters, setFilters] = useState({
    category: '',
    status: '', // Added status filter
  });
  const [sort, setSort] = useState({
    field: 'title',
    direction: 'asc',
  });

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sort, tasks]);

  async function getTasks() {
    try {
      let { data } = await axios.get('http://localhost:8000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const applyFiltersAndSort = () => {
    let updatedTasks = [...tasks];

    // Apply filters
    if (filters.category) {
      updatedTasks = updatedTasks.filter(task =>
        task.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.status) {
      updatedTasks = updatedTasks.filter(task =>
        task.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply sorting
    updatedTasks.sort((a, b) => {
      if (a[sort.field] < b[sort.field]) return sort.direction === 'asc' ? -1 : 1;
      if (a[sort.field] > b[sort.field]) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTasks(updatedTasks);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSortChange = (field) => {
    setSort({
      field,
      direction: sort.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  async function deleteTask(id) {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks(); // Refresh the task list
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-danger">Tasks</h1>
          <Link to="/tasks/create" className="btn btn-primary">Create Task</Link>
        </div>

        <div className="filters mt-4">
          <div className="d-flex">
            <div className="me-3">
              <label>Category:</label>
              <input
                className="form-control"
                type="text"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              />
            </div>
            <div className="me-3">
              <label>Status:</label>
              <select
                className="form-control"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sorting mt-4">
          <label>Sort by:</label>
          <button className="btn btn-link" onClick={() => handleSortChange('title')}>
            Title {sort.field === 'title' && (sort.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button className="btn btn-link" onClick={() => handleSortChange('status')}>
            Status {sort.field === 'status' && (sort.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <table className="table mt-5">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Due_Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredTasks.map((task) => (
            <tr key={task.id} className="align-middle">
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>{task.status}</td>
              <td>{task.due_date}</td>
              <td>
                <Link className="btn btn-primary me-1" to={`/tasks/${task.id}/edit`}>Edit</Link>
                <Link className="btn btn-primary me-1" to={`/tasks/${task.id}`}>Show</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

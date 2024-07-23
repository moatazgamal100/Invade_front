import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Show() {
    let {id} = useParams();
    let [task, setTask] = useState([]);
    let token = localStorage.getItem('token');
    useEffect(() => {
    getTask();
    }, []);

    async function getTask() {
        try {
        let { data } = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(data);
        setTask(data.data);
    } catch (error) {
    
    }
    }
    return <>
        <div class="container bg-white shadow p-5 rounded-4 w-75">
        <div class="d-flex align-items-center">
            <h1 class="me-3 text-primary">Task Title : </h1>
            <h2 >{ task.title }</h2>
        </div>
        <div class="d-flex align-items-center">
            <h1 class="me-3 text-primary">Task Description : </h1>
            <h2 >{ task.description }</h2>
        </div>
        <div class="d-flex align-items-center">
            <h1 class="me-3 text-primary">Task Status : </h1>
            <h2 >{ task.status }</h2>
        </div>
        <div class="d-flex align-items-center">
            <h1 class="me-3 text-primary">Task Category : </h1>
            <h2 >{ task.category }</h2>
        </div>
    </div>
    </>
}

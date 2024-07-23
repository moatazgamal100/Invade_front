import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function EditTask() {
    let [task, setTask] = useState([]);
    let { id } = useParams();
    let token = localStorage.getItem('token');

    useEffect(() => {
        getTask();
    }, []);
    
    useEffect(() => {
        if (task) {
            formik.setValues({
            title: task.title,
            description: task.description,
            category: task.category,
            status: task.status,
            });
        }
        
        }, [task]);
    
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

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        status: Yup.string().required('Required'),
        due_date: Yup.string().required('Required'),
        
    });
    
    const formik = useFormik({
    initialValues: {
    title: '',
    description: '',
    category: '',
    status: '',
    due_date: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleCreate,
    });
     
    async function handleCreate(values) {
        try {
          let { data } = await axios.put(`http://localhost:8000/api/tasks/${id}`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data);
        } catch (error) {
        
        }
    }
    
    return <>
        <div>
        <h2>Edit Task</h2>
        <form onSubmit={formik.handleSubmit}>

        <div className="mb-2">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? <div className="text-danger">{formik.errors.title}</div> : null}
        </div>
        <div className="mb-2">
          <label>Description:</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
        </div>
        <div className="mb-2">
          <label>Due_Date:</label>
          <input
            className="form-control"
            type="date"
            name="due_date"
            value={formik.values.due_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.due_date && formik.errors.due_date ? <div className="text-danger">{formik.errors.due_date}</div> : null}
        </div>
        <div className="mt-2">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="" label="Select category" />
            <option value="Work" label="Work" />
            <option value="Personal" label="Personal" />
            <option value="Urgent" label="Urgent" />
          </select>
          {formik.touched.category && formik.errors.category ? <div className="text-danger">{formik.errors.category}</div> : null}
        </div>
        <div className="mt-2">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value="" label="Select status" />
            <option value="pending" label="Pending" />
            <option value="completed" label="Completed" />
          </select>
          {formik.touched.status && formik.errors.status ? <div className="text-danger">{formik.errors.status}</div> : null}
        </div>
        <button  className="btn btn-primary mt-2" type="submit">
          Create Task
        </button>
      </form>
    </div>
    </>
}

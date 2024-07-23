import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        'Must contain one uppercase letter, one lowercase letter, one special character, and one number'
      )
      .required('Required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleNext,
  });

     
  async function handleNext(values) {
try {
    
    let { data } = await axios.post(`http://localhost:8000/api/register`, values)
    console.log(data);
} catch (error) {
    
}
      

    navigate('/login');
  }

  return (
    <div className="w-100 vh-100 position-relative mt-5 p-5">
      <form className="bg-white shadow w-50 mx-auto p-3 px-5 rounded-4" onSubmit={formik.handleSubmit}>
        <h1 className="mb-3">Register</h1>
        <div>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
        </div>
        <div className="mt-2">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
        </div>
        <div className="mt-2">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        </div>
        <div className="mt-2">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation ? <div className="text-danger">{formik.errors.password_confirmation}</div> : null}
        </div>
        <div className="mt-2 text-center">
          <button className="mt-3 mb-2 w-50 btn btn-dark text-white" type="submit">Register</button>
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

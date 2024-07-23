import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        "Must contain one uppercase letter, one lowercase letter, one special character, and one number"
      )
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleNext,
  });
  async function handleNext(values) {
    try {
      let { data } = await axios.post(
        `http://localhost:8000/api/login`,
        values
      );
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/home");
    } catch (error) {}
  }
  return (
    <>
      <div class="w-100 vh-100 position-relative mt-5 p-5">
        <form
          class="bg-white shadow  w-50 mx-auto p-3 px-5 rounded-4"
          onSubmit={formik.handleSubmit}
        >
          <h1 class=" mb-3">Login</h1>
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
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div class="mt-2 text-center">
            <button
              class="mt-3 mb-2 btn btn-dark text-white px-4 w-50"
              type="submit"
            >
              Login
            </button>
            <p>
              Don't have an account?<Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

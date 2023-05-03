// import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";

import Logo from "../assets/logo.svg";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import "./css/account-form.css";
import "./css/submit-btn.css";
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    // Options for the toast notification library
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      // If user is already logged in, navigate to home page
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (handleValidation()) {
      const { password, username, email } = values;
      const data = await axios.post(registerRoute, {
        // Send registration request to API
        username,
        email,
        password,
      });
      console.log(data);
      if (data.data.status === false) {
        // If registration fails, display error message using toast notification
        toast.error(data.data.msg, toastOptions);
      }
      if (data.data.status === true) {
        // If registration is successful, store user data in local storage and navigate to home page
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password do not match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater then 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater then 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    // Function for handling form input change and updating state
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className="submit-btn" type="submit">
            Register
          </button>
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;

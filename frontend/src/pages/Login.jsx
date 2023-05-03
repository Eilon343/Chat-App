// import necessary libraries and components
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/logo.svg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./css/account-form.css";
import "./css/submit-btn.css";

// define a functional component
const Login = () => {
  // use the hook 'useNavigate' from react-router-dom to navigate through the application
  const navigate = useNavigate();

  // initialize the state of the component using the 'useState' hook
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // configure the options for the toast notifications
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect hook to check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  // function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const data = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.data.status === false) {
        toast.error(data.data.msg, toastOptions);
      }
      if (data.data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user));
        navigate("/");
      }
    }
  };

  // function to validate the form fields
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    }
    return true;
  };

  // function to handle the change in the input fields
  const handleChange = (event) => {
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="submit-btn" type="submit">
            Log In
          </button>
          <span>
            Don't have an acount ? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  checkUsernameRoute,
  loginRoute,
  registerRoute,
} from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./css/account-form.css";
import "./css/submit-btn.css";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { debounce } from "../utils/Debounce";

const SetUsername = () => {
  onAuthStateChanged(firebaseAuth, (userData) => {
    if (!userData) {
      navigate("/login");
    } else {
      setEmail(
        userData.email ? userData.email : userData.providerData[0].email
      );
    }
  });
  const localHostKey = process.env.REACT_APP_LOCALHOST_KEY;
  // use the hook 'useNavigate' from react-router-dom to navigate through the application
  const navigate = useNavigate();

  // initialize the state of the component using the 'useState' hook
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState(undefined);
  const [usernameStatus, setUsernameStatus] = useState(undefined);

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
    if (localStorage.getItem(localHostKey)) {
      navigate("/");
    }
  }, []);

  // function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const data = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
      });
      if (data.data.status === false) {
        toast.error(data.data.msg, toastOptions);
      }
      if (data.data.status === true) {
        localStorage.setItem(localHostKey, JSON.stringify(data.data.user));
        navigate("/");
      }
    }
  };

  // function to validate the form fields
  const handleValidation = () => {
    if (values.length < 3) {
      toast.error(
        "Username is required and should be greater then 3 characters",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUsernameRoute, { username });
      setUsernameStatus(data.status);
      setLabel(data.message);
      setValues(username);
    }
  };

  const handleChange = debounce((name) => checkUsername(name), 300);

  return (
    <>
      {email && (
        <div className="form-container">
          <form onSubmit={(event) => handleSubmit(event)}>
            <span>Check Username Availability</span>
            <div className="row">
              <input
                className={`${
                  usernameStatus
                    ? "success"
                    : usernameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e.target.value)}
                min="3"
              />
              <label
                className={`${
                  usernameStatus
                    ? "success"
                    : usernameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
              >
                {" "}
                {label}
              </label>
            </div>
            <button className="submit-btn" type="submit">
              Create User
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SetUsername;

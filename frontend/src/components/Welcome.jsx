import React from "react";
import Robot from "../assets/robot.gif";
import Loader from "../assets/loader.gif";
import "./css/welcome.css";

const Welcome = ({ currentUser, isCurrentUserLoaded }) => {
  return (
    <>
      {isCurrentUserLoaded ? (
        <div className="wrapper-content">
          <img src={Robot} alt="Welcome Robot" />
          <h1>
            Welcome, <span>{currentUser.username}</span>
          </h1>
          <h3>Please select a chat to start Messaging</h3>
        </div>
      ) : (
        <div className="wrapper-loader">
          <img src={Loader} alt="loader" className="loader" />
        </div>
      )}
    </>
  );
};

export default Welcome;

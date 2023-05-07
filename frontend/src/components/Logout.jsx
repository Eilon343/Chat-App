import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "./css/Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button className="logout-btn" onClick={() => handleClick()}>
      <BiPowerOff />
    </button>
  );
};

export default Logout;

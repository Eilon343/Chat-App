import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import "react-toastify/dist/ReactToastify.css";
import "./css/submit-btn.css";
import "./css/set-avatar.css";

// This function sets the avatar for the user by fetching a random avatar image from the multiavatar API and setting it as the user's profile picture.
const SetAvatar = () => {
  // Store the API key and the API URL for fetching the avatar images
  const avatarApiKey = process.env.REACT_APP_AVATAR_API_KEY;
  const api = "https://api.multiavatar.com/45678945/";

  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  // Define options for the toast notification library
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Check if the user is logged in, and redirect to the login page if they are not
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  // Function to set the selected avatar as the user's profile picture
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      // Get the user from local storage
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      // Send a POST request to the server to set the user's profile picture
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log(data);
      // If the avatar is successfully set, update the user's information in local storage and redirect to the home page
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, please try again", toastOptions);
      }
    }
  };

  // Fetch four random avatar images from the multiavatar API on component mount
  useEffect(() => {
    async function fetchAvatars() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=${avatarApiKey}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="container">
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
